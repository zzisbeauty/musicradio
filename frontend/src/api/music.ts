export type Song = {
  id: string
  file: string
  url: string
  artist: string
  name: string
}

export type RadioState = {
  slot: string
  slotLabel: string
  song: Song | null
  intro: string
  updatedAt: string
}

const API_BASE = 'http://localhost:3001'

export async function fetchSongs(): Promise<Song[]> {
  const response = await fetch(`${API_BASE}/api/music/list`)
  const data = await response.json()
  return data.songs || []
}

export async function fetchRadio(): Promise<RadioState> {
  const response = await fetch(`${API_BASE}/api/radio/current`)
  return response.json()
}
