const express = require('express')
const { getCurrentRadio } = require('../services/radioBrain')

const router = express.Router()

router.get('/current', (req, res) => {
  res.json(getCurrentRadio())
})

module.exports = router
