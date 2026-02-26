interface MlpNetworkProps {
  active: boolean
}

export default function MlpNetwork({ active }: MlpNetworkProps) {
  // Input(5) → Hidden1(6) → Hidden2(4) → Output(2)
  const inputY = [20, 65, 110, 155, 200]
  const hidden1Y = [10, 50, 90, 130, 170, 210]
  const hidden2Y = [40, 85, 135, 180]
  const outputY = [80, 140]

  const inputX = 40, h1X = 180, h2X = 330, outX = 460

  const edges: Array<{ x1: number; y1: number; x2: number; y2: number }> = []

  // Input → Hidden1
  for (const iy of inputY) {
    for (const hy of hidden1Y) {
      edges.push({ x1: inputX, y1: iy, x2: h1X, y2: hy })
    }
  }
  // Hidden1 → Hidden2
  for (const hy of hidden1Y) {
    for (const h2y of hidden2Y) {
      edges.push({ x1: h1X, y1: hy, x2: h2X, y2: h2y })
    }
  }
  // Hidden2 → Output
  for (const h2y of hidden2Y) {
    for (const oy of outputY) {
      edges.push({ x1: h2X, y1: h2y, x2: outX, y2: oy })
    }
  }

  return (
    <div
      className={`iso-block iso-head ${active ? 'active' : ''}`}
      style={{ width: 500, height: 180 }}
    >
      <div className="iso-face top" style={{ width: 500, height: 180 }}>
        <svg viewBox="0 0 550 220" width="100%" height="100%" className="mlp-svg overflow-visible">
          {/* Edges */}
          <g className="mlp-edges" stroke="#ce93d8" strokeWidth={2} opacity={0.3}>
            {edges.map((e, i) => (
              <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
            ))}
          </g>

          {/* Input layer */}
          <g className="mlp-nodes input-layer" fill="rgba(255,255,255,0.1)" stroke="#ab47bc" strokeWidth={3}>
            {inputY.map((y) => (
              <circle key={y} cx={inputX} cy={y} r={10} />
            ))}
          </g>

          {/* Hidden layer 1 */}
          <g className="mlp-nodes hidden-layer" fill="rgba(255,255,255,0.1)" stroke="#9c27b0" strokeWidth={4}>
            {hidden1Y.map((y) => (
              <circle key={y} cx={h1X} cy={y} r={12} />
            ))}
          </g>

          {/* Hidden layer 2 */}
          <g className="mlp-nodes hidden-layer-2" fill="rgba(255,255,255,0.1)" stroke="#8e24aa" strokeWidth={5}>
            {hidden2Y.map((y) => (
              <circle key={y} cx={h2X} cy={y} r={14} />
            ))}
          </g>

          {/* Output layer */}
          <g className="mlp-nodes output-layer" fill="rgba(255,255,255,0.1)" stroke="#6a1b9a" strokeWidth={6}>
            <circle cx={outX} cy={80} r={18} className="out-node" />
            <circle cx={outX} cy={140} r={18} className="out-node" />
            <text
              x={495} y={86}
              fontFamily="'Pretendard', sans-serif"
              fontSize={20} fontWeight={700}
              fill="#ce93d8"
              className="out-label mci-label"
            >
              MCI
            </text>
            <text
              x={495} y={146}
              fontFamily="'Pretendard', sans-serif"
              fontSize={20} fontWeight={500}
              fill="#64748b"
              className="out-label hc-label"
            >
              HC
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
