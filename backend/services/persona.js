const { pickSong, makeIntro, getTimeSlot } = require('./radioBrain')

function reply(message = '') {
  const text = message.trim()
  const song = pickSong(text)
  if (!text) return { type: 'chat', reply: '我在。你可以告诉我想听什么，或者只是把今天交给音乐。' }
  if (/累|疲惫|难过|烦|压力|emo/.test(text)) {
    return { type: 'mood', reply: '听见了。那我们先不追赶今天了，放一首温柔一点的，让呼吸慢慢回来。', song }
  }
  if (/周杰伦|jay chou|放一首|点歌|想听/.test(text.toLowerCase())) {
    return { type: 'request', reply: song ? makeIntro(song, getTimeSlot()) : '可以。只是现在 music 文件夹里还没有可播放的歌。', song }
  }
  if (/下一首|换歌/.test(text)) {
    return { type: 'next', reply: '好，我们换一首。让情绪往前走一点。' }
  }
  return { type: 'chat', reply: `我听见你说：“${text}”。那就让这句话先在歌里停一会儿。` }
}

module.exports = { reply }
