import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  enabled: boolean
  selectedTask: string | null
  onTaskChange: (task: string | null) => void
}

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

export default function TaskSelectionSection({ enabled, selectedTask, onTaskChange }: Props) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-section-bg py-24 px-6 relative">
      {/* Disabled overlay */}
      <AnimatePresence>
        {!enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-section-bg/60 backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-text-secondary font-medium">Complete data upload to unlock task selection</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              onClick={() => enabled && onTaskChange(task.id === selectedTask ? null : task.id)}
              disabled={!enabled}
              className={`group relative flex items-start gap-5 rounded-2xl p-7 text-left transition-all duration-300 ${
                !enabled
                  ? 'bg-gray-50 border border-gray-200 cursor-not-allowed'
                  : selectedTask === task.id
                    ? 'bg-section-accent text-white shadow-lg shadow-section-accent/25 scale-[1.02] cursor-pointer'
                    : 'bg-white border border-border hover:border-section-accent hover:shadow-md cursor-pointer'
              }`}
            >
              <span className="text-3xl mt-0.5 shrink-0">{task.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-bold text-lg">
                    {task.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                    selectedTask === task.id
                      ? 'bg-white/20 text-white'
                      : 'bg-section-accent/10 text-section-accent'
                  }`}>
                    {task.category}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${
                  selectedTask === task.id ? 'text-white/80' : 'text-text-secondary'
                }`}>
                  {task.description}
                </p>
              </div>

              {/* Selection indicator */}
              <AnimatePresence>
                {selectedTask === task.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                  >
                    <span className="text-section-accent text-sm">✓</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
