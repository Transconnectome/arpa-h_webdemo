import { motion } from 'framer-motion'

const models = [
  {
    name: 'SWIFT',
    modality: 'fMRI',
    description: 'Spatiotemporal representation learning for functional brain imaging',
    color: 'border-blue-500',
  },
  {
    name: 'DIVER',
    modality: 'EEG / iEEG',
    description: 'Foundation model for electrophysiological brain signals',
    color: 'border-emerald-500',
  },
  {
    name: 'VLM',
    modality: 'Visual',
    description: 'Vision-language model for structural brain imaging analysis',
    color: 'border-purple-500',
  },
]

export default function ModelSelectionSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-section-bg py-24 px-6">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-section-accent font-mono text-sm tracking-widest uppercase mb-4">
            Step 02
          </p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Foundation Model Selection
          </h2>
          <p className="text-text-secondary text-lg mb-12">
            The appropriate model is automatically selected based on detected data modality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`border-t-4 ${model.color} bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow`}
            >
              <h3 className="text-2xl font-bold text-text-primary mb-2">{model.name}</h3>
              <p className="text-section-accent font-mono text-sm mb-4">{model.modality}</p>
              <p className="text-text-secondary">{model.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
