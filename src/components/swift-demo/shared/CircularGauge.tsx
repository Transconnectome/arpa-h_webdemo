interface CircularGaugeProps {
  value: number
  color: 'red' | 'green'
  label: string
}

export default function CircularGauge({ value, color, label }: CircularGaugeProps) {
  const strokeColor = color === 'red' ? '#EF4444' : '#10B981'
  return (
    <div className="relative" style={{ width: 160, height: 160 }}>
      <svg viewBox="0 0 36 36" className="block w-full h-full">
        <path
          className="fill-none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={3.8}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="fill-none"
          stroke={strokeColor}
          strokeWidth={3.8}
          strokeLinecap="round"
          strokeDasharray={`${value}, 100`}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          style={{ transition: 'stroke-dasharray 1s ease-out 0.5s' }}
        />
        <text
          x="18"
          y="20.35"
          textAnchor="middle"
          fill="#E5E7EB"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="7"
          fontWeight={800}
        >
          {value}%
        </text>
      </svg>
      <p
        className="text-center font-bold mt-3"
        style={{ color: strokeColor, fontSize: '1rem' }}
      >
        {label}
      </p>
    </div>
  )
}
