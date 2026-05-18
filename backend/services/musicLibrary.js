const fs = require('fs')
const path = require('path')

const musicDir = path.resolve(__dirname, '../../music')
const audioExts = new Set(['.mp3', '.wav', '.flac', '.m4a', '.ogg'])

function parseName(file) {
  const base = path.basename(file, path.extname(file))
  const parts = base.split(' - ')
  if (parts.length >= 2) {
    return { artist: parts[0].trim(), name: parts.slice(1).join(' - ').trim() }
  }
  return { artist: 'Unknown Artist', name: base.trim() }
}

function listSongs() {
  if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir, { recursive: true })
  return fs.readdirSync(musicDir)
    .filter((file) => audioExts.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
    .map((file, index) => {
      const meta = parseName(file)
      return {
        id: String(index + 1),
        file,
        url: `http://localhost:3001/music/${encodeURIComponent(file)}`,
        ...meta
      }
    })
}

module.exports = { listSongs }
