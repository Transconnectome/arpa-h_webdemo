const STEPS = [
  '0. Power-Up',
  '1. Raw Input',
  '2. 4D Rep',
  '3. Backbone',
  '4. Downstream',
  '5. Prediction',
  '6. Interpretation',
]

interface SwiftDemoProgressProps {
  currentScene: number
  onSceneChange: (scene: number) => void
}

export default function SwiftDemoProgress({ currentScene, onSceneChange }: SwiftDemoProgressProps) {
  return (
    <div className="flex items-center justify-center gap-1 py-3 px-4 flex-wrap">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <button
            onClick={() => onSceneChange(i)}
            className="px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap"
            style={{
              color: i <= currentScene ? '#00D4FF' : '#4B5563',
              fontWeight: i === currentScene ? 700 : 500,
              background: i === currentScene ? 'rgba(0,212,255,0.1)' : 'transparent',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            {label}
          </button>
          {i < STEPS.length - 1 && (
            <div
              className="mx-1"
              style={{
                width: 20,
                height: 2,
                background: i < currentScene ? '#00D4FF' : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
