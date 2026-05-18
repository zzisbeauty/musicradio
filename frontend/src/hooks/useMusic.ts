import { useCallback, useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import { fetchRadio, fetchSongs, type RadioState, type Song } from '../api/music'

export function useMusic() {
  const soundRef = useRef<Howl | null>(null)
  const timerRef = useRef<number | null>(null)
  const [songs, setSongs] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [radio, setRadio] = useState<RadioState | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    Promise.all([fetchSongs(), fetchRadio()]).then(([songList, radioState]) => {
      setSongs(songList)
      setRadio(radioState)
      if (radioState.song) {
        const index = songList.findIndex((song) => song.file === radioState.song?.file)
        if (index >= 0) setCurrentIndex(index)
      }
    })
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
  }, [])

  const playIndex = useCallback((index: number) => {
    const song = songs[index]
    if (!song) return
    soundRef.current?.unload()
    stopTimer()
    const sound = new Howl({
      src: [song.url],
      html5: true,
      onplay: () => {
        setPlaying(true)
        timerRef.current = window.setInterval(() => {
          const seek = sound.seek()
          const duration = sound.duration()
          setProgress(duration ? Number(seek) / duration : 0)
        }, 500)
      },
      onpause: () => setPlaying(false),
      onstop: () => setPlaying(false),
      onend: () => setCurrentIndex((value) => (songs.length ? (value + 1) % songs.length : 0))
    })
    soundRef.current = sound
    sound.play()
  }, [songs, stopTimer])

  useEffect(() => {
    if (songs.length) playIndex(currentIndex)
    return () => {
      soundRef.current?.unload()
      stopTimer()
    }
  }, [currentIndex, playIndex, songs.length, stopTimer])

  const play = () => soundRef.current?.play()
  const pause = () => soundRef.current?.pause()
  const next = () => setCurrentIndex((value) => (songs.length ? (value + 1) % songs.length : 0))

  return { songs, currentSong: songs[currentIndex] || null, radio, playing, progress, play, pause, next }
}
