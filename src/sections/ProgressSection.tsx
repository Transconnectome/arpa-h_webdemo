import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface Props {
  enabled: boolean
  isProcessing: boolean
  isComplete: boolean
  onStart: () => void
  onComplete: () => void
}

const steps = [
  { label: 'Data Preprocessing', description: 'Normalization, artifact removal, quality check', icon: '🔧' },
  { label: 'Model Loading', description: 'Loading pre-trained foundation model weights', icon: '📦' },
  { label: 'Feature Extraction', description: 'Computing neural representations from raw signals', icon: '🧬' },
  { label: 'Inference', description: 'Running clinical prediction task', icon: '🤖' },
  { label: 'Post-processing', description: 'Calibration, confidence estimation, result formatting', icon: '📊' },
]

export default function ProgressSection({ enabled, isProcessing, isComplete, onStart, onComplete }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-200px' })
  const [activeStep, setActiveStep] = useState(-1)
  const [stepProgress, setStepProgress] = useState<number[]>([0, 0, 0, 0, 0])
  const hasStarted = useRef(false)

  // Auto-start processing when section comes into view and task is selected
  useEffect(() => {
    if (isInView && enabled && !isProcessing && !isComplete && !hasStarted.current) {
      hasStarted.current = true
      onStart()
    }
  }, [isInView, enabled, isProcessing, isComplete, onStart])

  // Reset when not enabled
  useEffect(() => {
    if (!enabled) {
      hasStarted.current = false
      setActiveStep(-1)
      setStepProgress([0, 0, 0, 0, 0])
    }
  }, [enabled])

  // Animate progress steps sequentially
  useEffect(() => {
    if (!isProcessing) return

    setActiveStep(0)
    setStepProgress([0, 0, 0, 0, 0])

    const durations = [1200, 1000, 1800, 2000, 800] // ms per step
    let totalDelay = 0

    const timeouts: ReturnType<typeof setTimeout>[] = []

    steps.forEach((_, i) => {
      // Start step
      const startTimeout = setTimeout(() => {
        setActiveStep(i)
      }, totalDelay)
      timeouts.push(startTimeout)

      // Animate progress within step
      const progressInterval = setInterval(() => {
        setStepProgress(prev => {
          const next = [...prev]
          if (next[i] < 100) {
            next[i] = Math.min(next[i] + (100 / (durations[i] / 50)), 100)
          }
          return next
        })
      }, 50)

      const clearIntervalTimeout = setTimeout(() => {
        clearInterval(progressInterval)
        setStepProgress(prev => {
          const next = [...prev]
          next[i] = 100
          return next
        })
      }, totalDelay + durations[i])
      timeouts.push(clearIntervalTimeout)

      // Store interval ref for cleanup
      timeouts.push(progressInterval as unknown as ReturnType<typeof setTimeout>)

      totalDelay += durations[i] + 300 // gap between steps
    })

    // Complete
    const completeTimeout = setTimeout(() => {
      setActiveStep(steps.length)
      onComplete()
    }, totalDelay)
    timeouts.push(completeTimeout)

    return () => {
      timeouts.forEach(t => clearTimeout(t))
    }
  }, [isProcessing, onComplete])

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

      {/* Disabled overlay */}
      <AnimatePresence>
        {!enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-hero-bg/80 backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-text-light/60 font-medium">Select a task to begin processing</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          {steps.map((step, i) => {
            const isDone = stepProgress[i] >= 100
            const isActive = activeStep === i
            const isPending = activeStep < i

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Connection line */}
                {i < steps.length - 1 && (
                  <div className={`absolute left-5 top-16 bottom-0 w-px h-6 transition-colors duration-500 ${
                    isDone ? 'bg-hero-accent/50' : 'bg-white/10'
                  }`} />
                )}

                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg transition-all duration-500 ${
                    isDone
                      ? 'bg-success/20 border border-success/40'
                      : isActive
                        ? 'bg-hero-accent/20 border border-hero-accent/40 animate-pulse'
                        : 'bg-white/5 border border-white/10'
                  }`}>
                    {isDone ? '✓' : step.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className={`font-semibold transition-colors duration-500 ${
                          isDone ? 'text-success' : isActive ? 'text-white' : 'text-text-light/40'
                        }`}>
                          {step.label}
                        </span>
                        <span className={`text-sm ml-3 transition-colors duration-500 ${
                          isActive ? 'text-text-light/50' : 'text-text-light/20'
                        }`}>
                          {step.description}
                        </span>
                      </div>
                      <span className={`font-mono text-sm transition-colors duration-300 ${
                        isDone ? 'text-success' : isActive ? 'text-hero-accent' : 'text-text-light/20'
                      }`}>
                        {isPending ? '—' : `${Math.round(stepProgress[i])}%`}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-100 ${
                          isDone
                            ? 'bg-success'
                            : 'bg-gradient-to-r from-hero-accent to-section-accent'
                        }`}
                        style={{ width: `${stepProgress[i]}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Status indicator */}
        <motion.div className="mt-12 flex items-center gap-3">
          {isComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-success"
            >
              <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-mono text-sm">Processing complete — scroll down for results</span>
            </motion.div>
          ) : isProcessing ? (
            <div className="flex items-center gap-3 text-hero-accent">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-hero-accent border-t-transparent rounded-full"
              />
              <span className="font-mono text-sm">Processing...</span>
            </div>
          ) : enabled ? (
            <p className="text-text-light/30 font-mono text-sm">Scroll down to start processing</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
