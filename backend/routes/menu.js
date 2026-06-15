const express = require('express')
const router = express.Router()
const { obtenerMenu, obtenerPlatillo } = require('../controllers/menuController')

router.get('/',    obtenerMenu)
router.get('/:id', obtenerPlatillo)

module.exports = router
