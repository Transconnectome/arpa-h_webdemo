import { motion } from 'framer-motion'

const tasks = [
  { id: 'mci-ad', label: 'MCI → AD Conversion Prediction', icon: '🔮' },
  { id: 'mdd-dx', label: 'MDD Diagnosis', icon: '🩺' },
  { id: 'ocd-dx', label: 'OCD Diagnosis', icon: '🩺' },
  { id: 'treatment', label: 'Treatment Response Prediction', icon: '💊' },
]

export default function TaskSelectionSection() {
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
            Step 03
          </p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Task Selection
          </h2>
          <p className="text-text-secondary text-lg mb-12">
            Select a clinical prediction task for the uploaded subject data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task, i) => (
            <motion.button
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-4 bg-white border border-border rounded-xl p-6 text-left hover:border-section-accent hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-3xl">{task.icon}</span>
              <span className="text-text-primary font-semibold">{task.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
