import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { label: 'Data Preprocessing', description: 'Normalization, artifact removal, quality check', icon: '🔧', duration: 1.0 },
  { label: 'Model Loading', description: 'Loading pre-trained foundation model weights', icon: '📦', duration: 1.3 },
  { label: 'Feature Extraction', description: 'Computing neural representations from raw signals', icon: '🧬', duration: 1.6 },
  { label: 'Inference', description: 'Running clinical prediction task', icon: '🤖', duration: 1.9 },
  { label: 'Post-processing', description: 'Calibration, confidence estimation, result formatting', icon: '📊', duration: 2.2 },
]

export default function ProgressSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-200px' })

  return (
    <section className="min-h-screen flex items-center justify-center bg-hero-bg py-24 px-6 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-3xl w-full relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-hero-accent font-mono text-sm tracking-widest uppercase mb-3">
            Step 04
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Model Processing
          </h2>
          <p className="text-text-light/60 text-lg mb-16 max-w-xl">
            The AI foundation model is analyzing the brain data through a multi-stage pipeline.
          </p>
        </motion.div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              {/* Connection line */}
              {i < steps.length - 1 && (
                <div className="absolute left-5 top-16 bottom-0 w-px bg-gradient-to-b from-hero-accent/30 to-transparent h-6" />
              )}

              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-hero-accent/10 border border-hero-accent/20 flex items-center justify-center shrink-0 text-lg">
                  {step.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-white font-semibold">{step.label}</span>
                      <span className="text-text-light/40 text-sm ml-3">{step.description}</span>
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: step.duration + 0.5 }}
                      className="text-hero-accent font-mono text-sm"
                    >
                      {i <= 3 ? '100%' : '···'}
                    </motion.span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: i <= 3 ? '100%' : '35%' } : {}}
                      transition={{
                        duration: 1.5,
                        delay: step.duration,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className={`h-full rounded-full ${
                        i <= 3
                          ? 'bg-gradient-to-r from-hero-accent to-section-accent'
                          : 'bg-gradient-to-r from-hero-accent/60 to-hero-accent/30'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 3.5 }}
          className="mt-12 flex items-center gap-3 text-hero-accent"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-hero-accent border-t-transparent rounded-full"
          />
          <span className="font-mono text-sm">Processing... Estimated time remaining: 12s</span>
        </motion.div>
      </div>
    </section>
  )
}
