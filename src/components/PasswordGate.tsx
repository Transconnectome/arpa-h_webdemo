import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCESS_CODE = 'arpa2026'

interface Props {
  children: React.ReactNode
}

export default function PasswordGate({ children }: Props) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === ACCESS_CODE) {
      setIsExiting(true)
      setTimeout(() => setIsUnlocked(true), 800)
    } else {
      setError(true)
      setInput('')
      setTimeout(() => setError(false), 1500)
    }
  }

  if (isUnlocked) return <>{children}</>

  return (
    <>
      {/* Render children hidden behind gate for preloading */}
      <div className="hidden">{children}</div>

      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-hero-bg"
          >
            {/* Background particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-hero-accent/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.4, 0.1],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 text-center px-6"
            >
              {/* Logo / Title */}
              <div className="inline-flex items-center gap-2 border border-hero-accent/20 rounded-full px-5 py-2 mb-8">
                <span className="w-2 h-2 bg-hero-accent rounded-full animate-pulse" />
                <span className="text-hero-accent font-mono text-xs tracking-widest uppercase">
                  Restricted Access
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                ARPA-H AI Foundation Model
              </h1>
              <p className="text-text-light/40 text-sm mb-10 max-w-sm mx-auto">
                This demo requires an access code to proceed.
              </p>

              {/* Password form */}
              <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
                <div className="relative mb-4">
                  <input
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter access code"
                    autoFocus
                    className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white text-center font-mono tracking-widest placeholder:text-text-light/20 focus:outline-none focus:bg-white/10 transition-all ${
                      error
                        ? 'border-red-500 animate-[shake_0.3s_ease-in-out]'
                        : 'border-white/10 focus:border-hero-accent/50'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-hero-accent/10 border border-hero-accent/30 text-hero-accent rounded-xl font-medium hover:bg-hero-accent/20 transition-colors cursor-pointer"
                >
                  Access Demo →
                </button>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-4 font-mono"
                    >
                      Invalid access code
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              <p className="text-text-light/20 text-xs mt-12 font-mono">
                © 2026 Transconnectome
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
