import Waveform from './Waveform'
import { useMusic } from '../hooks/useMusic'

export default function Player() {
  const { songs, currentSong, radio, playing, progress, play, pause, next } = useMusic()

  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-10 text-center">
      <div className="mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
        {radio?.slotLabel || 'Claudio 正在调频'}
      </div>

      <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/70 p-8 shadow-2xl shadow-fuchsia-950/30">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,.18),transparent_35%)]" />
        <div className="relative z-10">
          <p className="mb-4 text-sm leading-7 text-zinc-400">{radio?.intro || '把 MP3 放进 music 文件夹，Claudio 就会开始播。'}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">{currentSong?.name || '等待本地音乐'}</h1>
          <p className="mt-4 text-lg text-zinc-400">{currentSong?.artist || `${songs.length} 首歌已扫描`}</p>

          <Waveform active={playing} />

          <div className="mx-auto mb-6 h-1 max-w-xl overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-gradient-to-r from-fuchsia-400 to-cyan-300" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>

          <div className="flex justify-center gap-3">
            <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black" onClick={playing ? pause : play}>{playing ? '暂停' : '播放'}</button>
            <button className="rounded-full border border-white/15 px-6 py-3 text-sm text-white" onClick={next}>下一首</button>
          </div>
        </div>
      </div>
    </section>
  )
}
