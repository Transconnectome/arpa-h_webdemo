import { motion } from 'framer-motion'
import NeuralParticles from '../components/NeuralParticles'
import TypingText from '../components/TypingText'

const limitations = [
  'Subjective feature selection',
  'Limited to known biomarkers',
  'Poor generalization across cohorts',
  'Cannot capture complex neural dynamics',
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-bg overflow-hidden">
      {/* Neural network particle background */}
      <NeuralParticles />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0E27_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 border border-hero-accent/30 rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-hero-accent rounded-full animate-pulse" />
          <span className="text-hero-accent font-mono text-xs tracking-widest uppercase">
            ARPA-H · AI Foundation Model
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          Beyond Human Selection
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold text-hero-accent mb-10 h-12"
        >
          <TypingText
            texts={[
              'Learn directly from raw brain signals',
              'Predict clinical outcomes with precision',
              'Generalize across populations',
            ]}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-text-light/60 text-lg max-w-2xl mx-auto mb-16"
        >
          Traditional approaches rely on hand-crafted features.
          Our foundation models discover patterns that humans cannot see.
        </motion.p>

        {/* Limitation pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {limitations.map((text, i) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15 }}
              className="px-4 py-2 rounded-full border border-red-500/30 text-red-400/80 text-sm font-mono line-through decoration-red-500/50"
            >
              {text}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-text-light/30 text-xs font-mono tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-text-light/20 rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-hero-accent rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
