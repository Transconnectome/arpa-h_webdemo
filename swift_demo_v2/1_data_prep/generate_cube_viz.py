"""
generate_cube_viz.py

Animated GIF of 5 representative axial brain slices side-by-side,
cycling through every time point — same style as adni_subject_A/B.gif.

For each GARD subject:
  1. Globally normalise the 4-D fMRI volume.
  2. Auto-select 5 axial z-positions that best capture the brain.
  3. For each time point t, render the 5 slices as a horizontal filmstrip.
  4. Save as an animated GIF (80 ms / frame ≈ 12.5 fps).
"""

import os
import numpy as np
import nibabel as nib
from PIL import Image

# ── Config ────────────────────────────────────────────────────────────────────

OUTPUT_DIR = "/pscratch/sd/s/seungju/SwiFT_v2_perlmutter/demo/output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SUBJECTS = {
    "gard_sub-24_hc": (
        "/pscratch/sd/s/sjmoon/GARD/derivatives/sub-24/func/"
        "sub-24_task-rest_space-MNI152NLin2009cAsym_desc-preproc_bold.nii.gz"
    ),
    "gard_sub-324_mci": (
        "/pscratch/sd/s/sjmoon/GARD/derivatives/sub-324/func/"
        "sub-324_task-rest_space-MNI152NLin2009cAsym_desc-preproc_bold.nii.gz"
    ),
}

N_SLICES       = 5      # number of axial slices
SLICE_PX       = 160    # pixel width/height of each slice panel
GAP_PX         = 6      # gap between panels
FRAME_MS       = 80     # ms per frame  (≈12.5 fps)
CLIP_PCT       = 99.5   # percentile for intensity clipping


# ── Data loading ──────────────────────────────────────────────────────────────

def load_and_normalize(path: str) -> np.ndarray:
    """Load 4-D fMRI, globally normalise to [0, 1]."""
    print(f"  Loading {path} ...")
    data = np.asarray(nib.load(path).dataobj, dtype=np.float32)
    print(f"  Shape: {data.shape}")
    nonzero = data[data > 0]
    if nonzero.size:
        p = np.percentile(nonzero, CLIP_PCT)
        data = np.clip(data, 0.0, p) / (p + 1e-8)
    return data


# ── Z-slice selection ─────────────────────────────────────────────────────────

def pick_z_slices(data_4d: np.ndarray, n: int = N_SLICES) -> list:
    """
    Auto-select n axial z-indices that best show the brain.
    Strategy:
      - Average over time → mean volume
      - Count non-zero voxels per z to find brain extent
      - Trim 10% margin from each end (noisy edges)
      - Evenly space n slices within the trimmed range
    """
    mean_vol   = data_4d.mean(axis=3)                       # (nx, ny, nz)
    brain_at_z = (mean_vol > 0.05).sum(axis=(0, 1))         # (nz,)
    threshold  = brain_at_z.max() * 0.10
    z_valid    = np.where(brain_at_z > threshold)[0]

    if len(z_valid) < n:
        nz      = data_4d.shape[2]
        z_valid = np.arange(nz // 4, 3 * nz // 4)

    margin  = max(1, len(z_valid) // 10)
    z_range = z_valid[margin: len(z_valid) - margin]

    indices = [
        int(z_range[round(i * (len(z_range) - 1) / (n - 1))])
        for i in range(n)
    ]
    return indices


# ── Frame generation ──────────────────────────────────────────────────────────

def make_frame(data_4d: np.ndarray, z_indices: list, t: int) -> Image.Image:
    """
    Build one GIF frame: n axial slices at time t arranged side-by-side.
    Returns a grayscale-converted RGB PIL image.
    """
    n      = len(z_indices)
    width  = n * SLICE_PX + (n - 1) * GAP_PX
    canvas = np.zeros((SLICE_PX, width), dtype=np.uint8)

    for i, z in enumerate(z_indices):
        sl = data_4d[:, :, z, t]          # (nx, ny) axial slice
        sl = np.rot90(sl)                  # standard orientation

        # resize to square panel
        pil_sl = Image.fromarray((sl * 255).astype(np.uint8), mode="L")
        pil_sl = pil_sl.resize((SLICE_PX, SLICE_PX), Image.LANCZOS)

        x0 = i * (SLICE_PX + GAP_PX)
        canvas[:, x0 : x0 + SLICE_PX] = np.array(pil_sl)

    return Image.fromarray(canvas, mode="L").convert("RGB")


# ── GIF writer ────────────────────────────────────────────────────────────────

def generate_gif(path: str, output_path: str) -> None:
    data = load_and_normalize(path)
    nt   = data.shape[3]

    z_indices = pick_z_slices(data)
    print(f"  Selected z-slices: {z_indices}")

    frames = []
    for t in range(nt):
        if t % 20 == 0:
            print(f"  Rendering frame {t + 1}/{nt} ...")
        frames.append(make_frame(data, z_indices, t))

    frames[0].save(
        output_path,
        save_all       = True,
        append_images  = frames[1:],
        duration       = FRAME_MS,
        loop           = 0,
        optimize       = False,
    )
    size_mb = os.path.getsize(output_path) / 1024 ** 2
    print(f"  Saved: {output_path}  ({size_mb:.1f} MB, {nt} frames)")


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    for name, path in SUBJECTS.items():
        print(f"\nProcessing {name} ...")
        generate_gif(path, os.path.join(OUTPUT_DIR, f"{name}.gif"))
    print("\nDone.")
