import { motion } from 'framer-motion'

const metrics = [
  { label: 'Accuracy', value: 91.2 },
  { label: 'AUC', value: 94.7 },
  { label: 'Sensitivity', value: 88.5 },
  { label: 'Specificity', value: 93.1 },
]

export default function ResultsSection() {
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
            Step 05
          </p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Results
          </h2>
          <p className="text-text-secondary text-lg mb-12">
            Prediction results and model performance metrics.
          </p>
        </motion.div>

        {/* Main prediction result */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-12 shadow-sm text-center mb-10"
        >
          <p className="text-text-secondary mb-2">MCI → AD Conversion Probability</p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-7xl font-bold text-section-accent"
          >
            85%
          </motion.p>
          <p className="text-text-secondary mt-4">
            This subject shows a high probability of conversion from MCI to Alzheimer's Disease.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <p className="text-text-secondary text-sm mb-1">{m.label}</p>
              <p className="text-3xl font-bold text-text-primary">{m.value}%</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
