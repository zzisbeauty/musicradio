const express = require('express')
const { listSongs } = require('../services/musicLibrary')

const router = express.Router()

router.get('/list', (req, res) => {
  res.json({ songs: listSongs() })
})

module.exports = router
