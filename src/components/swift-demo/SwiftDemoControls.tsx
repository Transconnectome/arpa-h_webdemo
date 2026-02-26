interface SwiftDemoControlsProps {
  currentScene: number
  totalScenes: number
  isAutoPlaying: boolean
  onPrev: () => void
  onNext: () => void
  onToggleAutoPlay: () => void
}

export default function SwiftDemoControls({
  currentScene,
  totalScenes,
  isAutoPlaying,
  onPrev,
  onNext,
  onToggleAutoPlay,
}: SwiftDemoControlsProps) {
  const isFirst = currentScene === 0
  const isLast = currentScene === totalScenes - 1

  return (
    <div className="flex items-center justify-center gap-6 py-4">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="px-5 py-2.5 rounded-lg font-mono text-sm transition-all"
        style={{
          background: 'rgba(43, 88, 118, 0.3)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          color: isFirst ? 'rgba(255,255,255,0.2)' : '#fff',
          cursor: isFirst ? 'not-allowed' : 'pointer',
          opacity: isFirst ? 0.3 : 1,
        }}
      >
        ← Prev
      </button>

      <span className="text-[#9CA3AF] font-mono text-sm tracking-wider">
        {currentScene + 1} / {totalScenes}
      </span>

      <button
        onClick={onNext}
        disabled={isLast}
        className="px-5 py-2.5 rounded-lg font-mono text-sm transition-all"
        style={{
          background: 'rgba(43, 88, 118, 0.3)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          color: isLast ? 'rgba(255,255,255,0.2)' : '#fff',
          cursor: isLast ? 'not-allowed' : 'pointer',
          opacity: isLast ? 0.3 : 1,
        }}
      >
        {isLast ? 'Finish' : 'Next →'}
      </button>

      <button
        onClick={onToggleAutoPlay}
        className="px-3 py-2.5 rounded-lg font-mono text-xs transition-all"
        style={{
          background: isAutoPlaying ? 'rgba(0,212,255,0.15)' : 'rgba(43, 88, 118, 0.3)',
          border: `1px solid ${isAutoPlaying ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
          color: isAutoPlaying ? '#00D4FF' : '#9CA3AF',
          cursor: 'pointer',
        }}
      >
        {isAutoPlaying ? '⏸ Auto' : '▶ Auto'}
      </button>
    </div>
  )
}
