const express = require('express')
const router = express.Router()
const {
  obtenerReservas,
  crearReserva,
  actualizarEstadoReserva,
  eliminarReserva
} = require('../controllers/reservasController')

router.get('/',        obtenerReservas)
router.post('/',       crearReserva)
router.patch('/:id',   actualizarEstadoReserva)
router.delete('/:id',  eliminarReserva)

module.exports = router
