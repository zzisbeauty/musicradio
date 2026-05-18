const { listSongs } = require('./musicLibrary')

const slots = {
  morning: { label: '轻柔醒来', intro: '早安。让这首歌先替阳光进来一点点。' },
  noon: { label: '活力工作', intro: '中午好。给今天的节奏加一点明亮的底色。' },
  afternoon: { label: '放松通勤', intro: '下午的风适合慢一点，这首歌陪你松开肩膀。' },
  evening: { label: '治愈夜晚', intro: '晚上好。把灯调暗一点，我们听一首有回声的歌。' },
  lateNight: { label: '安静睡眠', intro: '夜深了。让声音低下来，像把世界轻轻盖好。' }
}

function getTimeSlot(date = new Date()) {
  const hour = date.getHours()
  if (hour >= 6 && hour < 10) return 'morning'
  if (hour >= 11 && hour < 14) return 'noon'
  if (hour >= 15 && hour < 18) return 'afternoon'
  if (hour >= 19 && hour < 23) return 'evening'
  return 'lateNight'
}

function pickSong(message = '') {
  const songs = listSongs()
  if (!songs.length) return null
  const lower = message.toLowerCase()
  const matched = songs.find((song) => lower.includes(song.artist.toLowerCase()) || lower.includes(song.name.toLowerCase()))
  if (matched) return matched
  const seed = new Date().getHours() * 13 + new Date().getMinutes()
  return songs[seed % songs.length]
}

function makeIntro(song, slotKey = getTimeSlot()) {
  const slot = slots[slotKey]
  if (!song) return `${slot.intro} 现在还没有在 music 文件夹里发现音乐。`
  return `${slot.intro} 接下来是 ${song.artist} 的《${song.name}》。它不急着证明什么，只是在这个时间，刚好把心放回原位。`
}

function getCurrentRadio() {
  const slotKey = getTimeSlot()
  const song = pickSong()
  return {
    slot: slotKey,
    slotLabel: slots[slotKey].label,
    song,
    intro: makeIntro(song, slotKey),
    updatedAt: new Date().toISOString()
  }
}

module.exports = { getTimeSlot, pickSong, makeIntro, getCurrentRadio }
