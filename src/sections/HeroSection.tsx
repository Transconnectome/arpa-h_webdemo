import { motion } from 'framer-motion'
import SwiftDemo from '../components/swift-demo/SwiftDemo'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col bg-hero-bg overflow-hidden">
      {/* ARPA-H Badge */}
      <div className="flex justify-center pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 border border-hero-accent/30 rounded-full px-5 py-2"
        >
          <span className="w-2 h-2 bg-hero-accent rounded-full animate-pulse" />
          <span className="text-hero-accent font-mono text-xs tracking-widest uppercase">
            ARPA-H · AI Foundation Model
          </span>
        </motion.div>
      </div>

      {/* SwiFT Demo — main content */}
      <div className="flex-1 min-h-0 flex flex-col">
        <SwiftDemo />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex flex-col items-center gap-3 pb-6"
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
    </section>
  )
}
