export default function Waveform({ active = false }: { active?: boolean }) {
  const bars = Array.from({ length: 36 })

  return (
    <div className="flex h-24 items-center justify-center gap-1">
      {bars.map((_, index) => (
        <div
          key={index}
          className="w-1 rounded-full bg-gradient-to-t from-fuchsia-400 to-cyan-300 transition-all duration-500"
          style={{
            height: `${active ? 18 + ((index * 17) % 64) : 12}px`,
            opacity: active ? 0.85 : 0.28,
            animation: active ? `float ${1.1 + (index % 6) * 0.15}s ease-in-out infinite` : undefined,
            animationDelay: `${index * 0.03}s`
          }}
        />
      ))}
    </div>
  )
}
