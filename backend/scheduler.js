const cron = require('node-cron')
const { getCurrentRadio } = require('./services/radioBrain')

function start() {
  cron.schedule('* * * * *', () => {
    const radio = getCurrentRadio()
    const song = radio.song ? `${radio.song.artist} - ${radio.song.name}` : 'no local songs'
    console.log(`[Claudio] ${radio.slotLabel}: ${song}`)
  })
}

module.exports = { start }
