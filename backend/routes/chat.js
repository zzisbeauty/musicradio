const express = require('express')
const { reply } = require('../services/persona')

const router = express.Router()

router.post('/', (req, res) => {
  res.json(reply(req.body?.message || ''))
})

module.exports = router
