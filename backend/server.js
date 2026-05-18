const path = require('path')
const express = require('express')
const cors = require('cors')
const musicRoutes = require('./routes/music')
const chatRoutes = require('./routes/chat')
const radioRoutes = require('./routes/radio')
const scheduler = require('./scheduler')

const app = express()
const port = process.env.PORT || 3001
const musicDir = path.resolve(__dirname, '../music')

app.use(cors())
app.use(express.json())
app.use('/music', express.static(musicDir))
app.use('/api/music', musicRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/radio', radioRoutes)

scheduler.start()

app.listen(port, () => {
  console.log(`Claudio backend listening on http://localhost:${port}`)
})
