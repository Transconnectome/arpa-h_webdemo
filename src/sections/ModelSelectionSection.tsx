import { motion } from 'framer-motion'

const models = [
  {
    name: 'SWIFT',
    modality: 'fMRI',
    description: 'Spatiotemporal representation learning for functional brain imaging. Captures dynamic BOLD signal patterns across whole-brain networks.',
    color: 'blue',
    icon: '🧠',
    tags: ['Self-supervised', 'Spatiotemporal', 'BOLD'],
  },
  {
    name: 'DIVER',
    modality: 'EEG / iEEG',
    description: 'Foundation model for electrophysiological brain signals. Learns temporal dynamics from raw voltage traces.',
    color: 'emerald',
    icon: '⚡',
    tags: ['Contrastive', 'Temporal', 'Multi-channel'],
  },
  {
    name: 'VLM',
    modality: 'Visual / Structural',
    description: 'Vision-language model for structural brain imaging and visual neuroscience data analysis.',
    color: 'purple',
    icon: '👁️',
    tags: ['Multi-modal', 'Vision-Language', 'Structural'],
  },
]

const colorMap: Record<string, { border: string; bg: string; tag: string; glow: string }> = {
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-500/5',
    tag: 'bg-blue-100 text-blue-700',
    glow: 'shadow-blue-500/20',
  },
  emerald: {
    border: 'border-emerald-500',
    bg: 'bg-emerald-500/5',
    tag: 'bg-emerald-100 text-emerald-700',
    glow: 'shadow-emerald-500/20',
  },
  purple: {
    border: 'border-purple-500',
    bg: 'bg-purple-500/5',
    tag: 'bg-purple-100 text-purple-700',
    glow: 'shadow-purple-500/20',
  },
}

export default function ModelSelectionSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-section-bg py-24 px-6">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-section-accent font-mono text-sm tracking-widest uppercase mb-3">
            Step 02
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Foundation Model Selection
          </h2>
          <p className="text-text-secondary text-lg mb-4 max-w-2xl">
            The appropriate model is automatically selected based on the detected data modality.
          </p>
          {/* Flow indicator */}
          <div className="flex items-center gap-3 mb-12">
            <span className="px-3 py-1.5 bg-section-accent/10 text-section-accent font-mono text-xs rounded-lg">
              Data Modality
            </span>
            <span className="text-text-secondary">→</span>
            <span className="px-3 py-1.5 bg-section-accent/10 text-section-accent font-mono text-xs rounded-lg">
              Auto-Select Model
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model, i) => {
            const c = colorMap[model.color]
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative border-t-4 ${c.border} ${c.bg} rounded-2xl p-8 hover:shadow-xl ${c.glow} transition-shadow cursor-default`}
              >
                <div className="text-4xl mb-4">{model.icon}</div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">{model.name}</h3>
                <p className={`font-mono text-sm mb-4 ${c.border.replace('border', 'text')}`}>
                  {model.modality}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {model.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
