import { useState } from 'react'
import { motion } from 'framer-motion'

const tasks = [
  {
    id: 'mci-ad',
    label: 'MCI → AD Conversion',
    description: 'Predict probability of progression from Mild Cognitive Impairment to Alzheimer\'s Disease',
    icon: '🔮',
    category: 'Prognosis',
  },
  {
    id: 'mdd-dx',
    label: 'MDD Diagnosis',
    description: 'Major Depressive Disorder detection and severity classification',
    icon: '🩺',
    category: 'Diagnosis',
  },
  {
    id: 'ocd-dx',
    label: 'OCD Diagnosis',
    description: 'Obsessive-Compulsive Disorder identification from brain activity patterns',
    icon: '🩺',
    category: 'Diagnosis',
  },
  {
    id: 'treatment',
    label: 'Treatment Response',
    description: 'Predict individual treatment response rate for pharmacological or neuromodulation therapy',
    icon: '💊',
    category: 'Prediction',
  },
]

export default function TaskSelectionSection() {
  const [selected, setSelected] = useState<string | null>(null)

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
            Step 03
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Task Selection
          </h2>
          <p className="text-text-secondary text-lg mb-12 max-w-2xl">
            Select a clinical prediction task for the uploaded subject data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tasks.map((task, i) => (
            <motion.button
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => setSelected(task.id === selected ? null : task.id)}
              className={`group relative flex items-start gap-5 rounded-2xl p-7 text-left transition-all duration-300 cursor-pointer ${
                selected === task.id
                  ? 'bg-section-accent text-white shadow-lg shadow-section-accent/25 scale-[1.02]'
                  : 'bg-white border border-border hover:border-section-accent hover:shadow-md'
              }`}
            >
              <span className="text-3xl mt-0.5 shrink-0">{task.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-bold text-lg">
                    {task.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                    selected === task.id
                      ? 'bg-white/20 text-white'
                      : 'bg-section-accent/10 text-section-accent'
                  }`}>
                    {task.category}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${
                  selected === task.id ? 'text-white/80' : 'text-text-secondary'
                }`}>
                  {task.description}
                </p>
              </div>

              {/* Selection indicator */}
              {selected === task.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                >
                  <span className="text-section-accent text-sm">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
