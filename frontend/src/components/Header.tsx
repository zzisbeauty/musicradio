import { useEffect, useState } from 'react'

export default function Header() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <header className="flex items-center justify-between px-6 py-5 text-sm text-zinc-300">
      <div>
        <div className="text-lg font-semibold text-white">Claudio FM</div>
        <div className="text-xs text-zinc-500">Claudio AI 电台</div>
      </div>
      <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-200">正在直播</div>
      <div className="tabular-nums text-zinc-400">{time.toLocaleTimeString('zh-CN', { hour12: false })}</div>
    </header>
  )
}
