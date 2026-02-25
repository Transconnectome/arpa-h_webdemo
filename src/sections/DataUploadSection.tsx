import { motion } from 'framer-motion'

export default function DataUploadSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-section-bg py-24 px-6">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-section-accent font-mono text-sm tracking-widest uppercase mb-4">
            Step 01
          </p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Data Upload
          </h2>
          <p className="text-text-secondary text-lg mb-12">
            Upload subject brain data. Modality is automatically detected by file extension.
          </p>
        </motion.div>

        {/* Drop zone placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-2 border-dashed border-border rounded-2xl p-16 text-center hover:border-section-accent transition-colors cursor-pointer"
        >
          <div className="text-6xl mb-4">🧠</div>
          <p className="text-text-primary font-semibold text-lg">
            Drop your neuroimaging data here
          </p>
          <p className="text-text-secondary mt-2">
            .nii, .nii.gz → fMRI &nbsp;|&nbsp; .edf, .set, .fif → EEG/iEEG
          </p>
        </motion.div>
      </div>
    </section>
  )
}
