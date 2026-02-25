import { motion } from 'framer-motion'

const steps = [
  { label: 'Data Preprocessing', pct: 100 },
  { label: 'Model Loading', pct: 100 },
  { label: 'Inference', pct: 75 },
  { label: 'Post-processing', pct: 0 },
]

export default function ProgressSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-hero-bg py-24 px-6">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-hero-accent font-mono text-sm tracking-widest uppercase mb-4">
            Step 04
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Model Processing
          </h2>
          <p className="text-text-light/70 text-lg mb-16">
            AI foundation model is analyzing the brain data.
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-light font-medium">{step.label}</span>
                <span className="text-hero-accent font-mono">{step.pct}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${step.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-hero-accent to-section-accent rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
