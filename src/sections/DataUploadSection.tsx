import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Modality = 'fmri' | 'eeg' | null

interface DetectedFile {
  name: string
  modality: Modality
  icon: string
}

const sampleFiles: Record<string, DetectedFile> = {
  fmri: { name: 'sub-001_bold.nii.gz', modality: 'fmri', icon: '🧠' },
  eeg: { name: 'sub-001_eeg.set', modality: 'eeg', icon: '⚡' },
}

const modalityConfig = {
  fmri: {
    label: 'fMRI Detected',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/40',
    description: 'Functional magnetic resonance imaging — BOLD signal',
    extensions: ['.nii', '.nii.gz'],
  },
  eeg: {
    label: 'EEG / iEEG Detected',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/40',
    description: 'Electrophysiological brain signals',
    extensions: ['.edf', '.set', '.fif', '.bdf'],
  },
}

export default function DataUploadSection() {
  const [detected, setDetected] = useState<Modality>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleSelect = (type: 'fmri' | 'eeg') => {
    setDetected(null)
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setDetected(type)
    }, 1500)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-section-bg py-24 px-6">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-section-accent font-mono text-sm tracking-widest uppercase mb-3">
            Step 01
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Data Upload
          </h2>
          <p className="text-text-secondary text-lg mb-12 max-w-2xl">
            Upload subject brain data. The system automatically identifies the data modality
            based on file extension.
          </p>
        </motion.div>

        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            isScanning
              ? 'border-hero-accent bg-hero-accent/5'
              : detected
                ? `${modalityConfig[detected].border} ${modalityConfig[detected].bg}`
                : 'border-border hover:border-section-accent'
          }`}
        >
          {/* Scanning animation */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ top: 0, opacity: 0 }}
                animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'linear' }}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-hero-accent to-transparent"
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!detected && !isScanning && (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-6xl mb-6">📂</div>
                <p className="text-text-primary font-semibold text-lg mb-2">
                  Drop neuroimaging data here
                </p>
                <p className="text-text-secondary text-sm mb-8">
                  .nii, .nii.gz → fMRI &nbsp;&nbsp;|&nbsp;&nbsp; .edf, .set, .fif → EEG/iEEG
                </p>

                {/* Demo buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleSelect('fmri')}
                    className="px-6 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-600 rounded-xl font-medium hover:bg-blue-500/20 transition-colors cursor-pointer"
                  >
                    🧠 Try fMRI sample
                  </button>
                  <button
                    onClick={() => handleSelect('eeg')}
                    className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 rounded-xl font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer"
                  >
                    ⚡ Try EEG sample
                  </button>
                </div>
              </motion.div>
            )}

            {isScanning && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8"
              >
                <div className="text-5xl mb-4 animate-pulse">🔬</div>
                <p className="text-hero-accent font-mono text-sm tracking-wider">
                  Analyzing file extension...
                </p>
              </motion.div>
            )}

            {detected && !isScanning && (
              <motion.div
                key="detected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <div className="text-5xl mb-4">{sampleFiles[detected].icon}</div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${modalityConfig[detected].bg} ${modalityConfig[detected].border} border mb-4`}>
                  <span className="w-2 h-2 bg-current rounded-full animate-pulse" />
                  <span className={`font-mono text-sm font-semibold ${modalityConfig[detected].color}`}>
                    {modalityConfig[detected].label}
                  </span>
                </div>
                <p className="text-text-primary font-mono text-sm mb-1">
                  {sampleFiles[detected].name}
                </p>
                <p className="text-text-secondary text-sm">
                  {modalityConfig[detected].description}
                </p>
                <button
                  onClick={() => setDetected(null)}
                  className="mt-6 text-text-secondary text-sm hover:text-section-accent transition-colors cursor-pointer underline"
                >
                  Reset & try another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
