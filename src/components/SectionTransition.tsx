interface SectionTransitionProps {
  from?: 'dark' | 'light'
  to?: 'dark' | 'light'
}

const colors = {
  dark: '#0A0E27',
  light: '#FAFBFC',
}

export default function SectionTransition({ from = 'dark', to = 'light' }: SectionTransitionProps) {
  return (
    <div
      className="h-32 w-full"
      style={{
        background: `linear-gradient(to bottom, ${colors[from]}, ${colors[to]})`,
      }}
    />
  )
}
