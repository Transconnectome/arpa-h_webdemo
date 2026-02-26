import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './SwiftDemo.css'
import SwiftDemoProgress from './SwiftDemoProgress'
import SwiftDemoControls from './SwiftDemoControls'
import ScenePowerUp from './scenes/ScenePowerUp'
import SceneRawInput from './scenes/SceneRawInput'
import Scene4DRep from './scenes/Scene4DRep'
import SceneBackbone from './scenes/SceneBackbone'
import SceneDownstream from './scenes/SceneDownstream'
import ScenePrediction from './scenes/ScenePrediction'
import SceneInterpretation from './scenes/SceneInterpretation'

const TOTAL_SCENES = 7
const AUTO_PLAY_DELAY = 6000

const scenes = [
  ScenePowerUp,
  SceneRawInput,
  Scene4DRep,
  SceneBackbone,
  SceneDownstream,
  ScenePrediction,
  SceneInterpretation,
]

const sceneVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function SwiftDemo() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const goTo = useCallback((scene: number) => {
    setCurrentScene(Math.max(0, Math.min(TOTAL_SCENES - 1, scene)))
  }, [])

  const next = useCallback(() => {
    setCurrentScene((prev) => Math.min(prev + 1, TOTAL_SCENES - 1))
  }, [])

  const prev = useCallback(() => {
    setCurrentScene((prev) => Math.max(prev - 1, 0))
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev)
  }, [])

  // Track whether auto-play completed naturally (not manually stopped)
  const autoPlayCompletedRef = useRef(false)

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return
    if (currentScene >= TOTAL_SCENES - 1) {
      autoPlayCompletedRef.current = true
      setIsAutoPlaying(false)
      return
    }
    const timer = setTimeout(next, AUTO_PLAY_DELAY)
    return () => clearTimeout(timer)
  }, [isAutoPlaying, currentScene, next])

  // Auto-scroll to next section after auto-play completes on last scene
  useEffect(() => {
    if (!autoPlayCompletedRef.current) return
    if (currentScene !== TOTAL_SCENES - 1) return
    autoPlayCompletedRef.current = false

    const timer = setTimeout(() => {
      const target = document.getElementById('data-upload')
      target?.scrollIntoView({ behavior: 'smooth' })
    }, AUTO_PLAY_DELAY)
    return () => clearTimeout(timer)
  }, [currentScene])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        next()
        setIsAutoPlaying(false)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
        setIsAutoPlaying(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  const SceneComponent = scenes[currentScene]

  return (
    <div className="flex flex-col w-full flex-1 min-h-0">
      {/* Progress dots */}
      <SwiftDemoProgress currentScene={currentScene} onSceneChange={(s) => { goTo(s); setIsAutoPlaying(false) }} />

      {/* Scene area */}
      <div className="flex-1 relative min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-y-auto"
          >
            <div className="min-h-full flex items-center justify-center py-4">
              <SceneComponent />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <SwiftDemoControls
        currentScene={currentScene}
        totalScenes={TOTAL_SCENES}
        isAutoPlaying={isAutoPlaying}
        onPrev={() => { prev(); setIsAutoPlaying(false) }}
        onNext={() => { next(); setIsAutoPlaying(false) }}
        onToggleAutoPlay={toggleAutoPlay}
      />
    </div>
  )
}
