// script.js
// Logic for SwiFT Single-Screen 3D Flow Demo (With Reversed Bottom Row)

const startBtn = document.getElementById('start-btn');

// SVG Elements
const svgLayer = document.getElementById('svg-layer');
const pathA = document.getElementById('pathA');
const pathB = document.getElementById('pathB');

// Animation State
let isPlaying = false;
let sequenceTimeouts = [];

// Clean up all active states
function resetDemo() {
    isPlaying = false;
    startBtn.textContent = 'Start Analysis';
    startBtn.disabled = false;

    // Clear timeouts
    sequenceTimeouts.forEach(t => clearTimeout(t));
    sequenceTimeouts = [];

    // Remove "active" / "flipped" classes from all visual elements
    document.querySelectorAll('.active').forEach(el => {
        // preserve base nav active state
        if (!el.id || el.id !== 'nav-step-1') {
            el.classList.remove('active');
        }
    });

    // Cleanup custom states
    document.querySelectorAll('.suck-in').forEach(el => el.classList.remove('suck-in'));
    document.querySelectorAll('.interp-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.arrow').forEach(el => {
        el.classList.remove('blinking');
        el.classList.remove('color-A');
        el.classList.remove('color-B');
    });
    document.querySelectorAll('.rep-box').forEach(el => {
        el.classList.remove('color-A');
        el.classList.remove('color-B');
    });

    // Cleanup specific IDs
    ["backbone-message", "msg-input", "msg-downstream", "msg-interp"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });

    document.getElementById('nav-step-1').classList.add('active');

    document.querySelectorAll('.flipped').forEach(el => el.classList.remove('flipped'));

    // Reset path highlights
    pathA.classList.remove('active');
    pathB.classList.remove('active');
}

// Calculate Bezier curves between two DOM elements
function updatePaths() {
    const layerRect = svgLayer.getBoundingClientRect();

    // Helper to get center of element relative to SVG layer
    function getCenter(id) {
        const el = document.getElementById(id);
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - layerRect.left,
            y: rect.top + rect.height / 2 - layerRect.top
        };
    }

    // Track A (Red)
    const pA1 = getCenter('node-4d-A');      // 4D Box A
    const pA2 = getCenter('backbone-container'); // SwiFT Backbone
    const pA3 = getCenter('u-turn-arrow');     // Down Arrow
    const pA4 = getCenter('iso-latent');       // Latent Rep
    // const pA5 = getCenter('arrow-to-predA');   // Fork Up (Now on the left of Downstream)
    const pA6 = getCenter('result-A');         // Card A

    // Track B (Green)
    const pB1 = getCenter('node-4d-B');
    const pB2 = getCenter('backbone-container');
    const pB3 = getCenter('u-turn-arrow');
    const pB4 = getCenter('iso-latent');
    // const pB5 = getCenter('arrow-to-predB');   // Fork Down (Now on the left of Downstream)
    const pB6 = getCenter('result-B');

    const OFFSET = 7;
    const FORK_X = pB3.x + OFFSET;  // green's U-turn x = shared horizontal start in Row 2

    // Track A (Red): separate lane down, then jogs right to FORK_X, then left to result-A
    let d_A = `M ${pA1.x} ${pA1.y} `;
    d_A += `L ${pA3.x - OFFSET} ${pA1.y} `;   // Row 1: separate left lane
    d_A += `L ${pA3.x - OFFSET} ${pA6.y} `;   // Vertical descent in separate lane
    d_A += `L ${FORK_X} ${pA6.y} `;            // Merge right to shared horizontal start
    d_A += `L ${pA6.x} ${pA6.y}`;              // Left to result card A

    pathA.setAttribute('d', d_A);

    // Track B (Green): goes to FORK_X, descends to result-B y, then left to result-B
    let d_B = `M ${pB1.x} ${pB1.y} `;
    d_B += `L ${FORK_X} ${pB1.y} `;            // Row 1: to FORK_X (green's lane)
    d_B += `L ${FORK_X} ${pB6.y} `;            // Vertical descent
    d_B += `L ${pB6.x} ${pB6.y}`;              // Left to result card B

    pathB.setAttribute('d', d_B);
}

// Ensure paths are correct on resize
window.addEventListener('resize', updatePaths);
// Initial draw
setTimeout(updatePaths, 100);


// Orchestrator
function runSequence() {
    isPlaying = true;
    startBtn.textContent = 'Analyzing...';
    startBtn.disabled = true;

    // Flash Paths
    pathA.classList.add('active');
    pathB.classList.add('active');

    // Helper for scheduling
    function schedule(time, action) {
        sequenceTimeouts.push(setTimeout(() => { if (isPlaying) action(); }, time));
    }

    // --- NEW: Immersive Full-Screen Power-Up Sequence (0ms - 5000ms) ---
    schedule(100, () => {
        document.getElementById('power-overlay').classList.add('dimmed');
        document.getElementById('power-up-container').classList.add('active');
    });
    schedule(800, () => { document.getElementById('pillar-data').classList.add('active'); });
    schedule(1600, () => { document.getElementById('pillar-compute').classList.add('active'); });
    schedule(2400, () => { document.getElementById('pillar-arch').classList.add('active'); });

    schedule(3400, () => {
        document.getElementById('power-message').classList.add('active');
    });

    // 5500ms: Suck-in animation begins (overlaps with tripled message)
    schedule(5500, () => {
        document.getElementById('power-up-container').classList.add('suck-in');
    });

    // 6100ms: Remove power message (Tripled duration: approx ~2700ms)
    schedule(6100, () => {
        document.getElementById('power-message').classList.remove('active');
    });

    // 6300ms: Hide overlay and cleanup power-up
    schedule(6300, () => {
        document.getElementById('power-overlay').classList.remove('dimmed');
        document.getElementById('power-up-container').classList.remove('active');
        document.getElementById('power-up-container').classList.remove('suck-in');
    });

    // 6800ms: Stage 1: Raw fMRI Input highlight + message
    schedule(6800, () => {
        document.getElementById('nav-step-1').classList.add('active');
        document.querySelector('.input-track.A .raw-gif').classList.add('active');
        document.querySelector('.input-track.B .raw-gif').classList.add('active');
        const m = document.getElementById('msg-input');
        if (m) m.classList.add('active');
    });

    // 7800ms: Arrows from Stage 1 to 4D start blinking
    schedule(7800, () => {
        const arrowA = document.getElementById('arrow-A-to-4d');
        const arrowB = document.getElementById('arrow-B-to-4d');
        if (arrowA) {
            arrowA.classList.add('blinking');
            arrowA.classList.add('color-A');
        }
        if (arrowB) {
            arrowB.classList.add('blinking');
            arrowB.classList.add('color-B');
        }
    });

    // 8800ms: 4D Node active (Stage 2) & Colored
    schedule(8800, () => {
        const nodeA = document.getElementById('node-4d-A');
        const nodeB = document.getElementById('node-4d-B');
        nodeA.classList.add('active');
        nodeA.classList.add('color-A');
        nodeB.classList.add('active');
        nodeB.classList.add('color-B');

        document.getElementById('nav-step-2').classList.add('active');
        document.querySelectorAll('.nav-line')[0].classList.add('active');
    });

    // 10000ms: Arrow to SwiFT Backbone lights up + message + first block (simultaneous)
    schedule(10000, () => {
        document.getElementById('arrow-to-swift').classList.add('active');
        const msg = document.getElementById('backbone-message');
        if (msg) msg.classList.add('active');
        document.getElementById('iso-patch').classList.add('active');
    });

    // 10700ms: SwiFT Backbone Sequence continues
    schedule(10700, () => { document.getElementById('iso-st1').classList.add('active'); });
    schedule(11400, () => { document.getElementById('iso-st2').classList.add('active'); });
    schedule(12100, () => { document.getElementById('iso-st4').classList.add('active'); });

    // 14100ms: Representation Extraction (Normalization Layer)
    schedule(14100, () => {
        document.getElementById('iso-norm').classList.add('active');
        document.querySelector('.flow-line.vertical').classList.add('active');
        document.querySelector('.flow-arrow-down').classList.add('active');

        document.getElementById('nav-step-3').classList.add('active');
        document.querySelectorAll('.nav-line')[1].classList.add('active');
    });

    // 15100ms: Downstream Fine-Tuning Head + message (Sequential highlight)
    schedule(15100, () => {
        document.getElementById('iso-latent').classList.add('active');
        const m = document.getElementById('msg-downstream');
        if (m) m.classList.add('active');
    });

    schedule(15800, () => {
        document.getElementById('iso-head').classList.add('active');
        // document.getElementById('arrow-to-predA').classList.add('active');
        // document.getElementById('arrow-to-predB').classList.add('active');

        document.getElementById('nav-step-4').classList.add('active');
        document.querySelectorAll('.nav-line')[2].classList.add('active');
    });

    // 16600ms: Predict Reveal
    schedule(16600, () => {
        document.getElementById('result-A').classList.add('active');
        document.getElementById('result-A').classList.add('flipped');
        document.getElementById('result-B').classList.add('active');
        document.getElementById('result-B').classList.add('flipped');
    });

    // 17600ms: Interpretation [Stage 6] + message
    schedule(17600, () => {
        document.getElementById('stage-interp').classList.add('active');
        document.getElementById('interp-A').classList.add('active');
        // Activate image container for fade-in
        const ic = document.querySelector('.interp-container');
        if (ic) ic.classList.add('active');
        const m = document.getElementById('msg-interp');
        if (m) m.classList.add('active');
    });

    // 19000ms: Sequence complete
    schedule(19000, () => {
        startBtn.textContent = 'Restart Demo';
        startBtn.disabled = false;
        startBtn.onclick = () => {
            resetDemo();
            startBtn.onclick = runSequence; // reset handler back to run
        };
        isPlaying = false; // Sequence complete
    });
}

// Initial binding
startBtn.onclick = runSequence;

// Wait a bit to ensure fonts/layout are loaded before drawing initial paths
window.onload = () => {
    setTimeout(updatePaths, 200);
};
