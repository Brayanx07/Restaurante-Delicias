const express = require('express')
const router = express.Router()
const {
  obtenerReservas,
  obtenerReserva,
  crearReserva,
  editarReserva,
  actualizarEstadoReserva,
  eliminarReserva
} = require('../controllers/reservasController')

router.get('/',        obtenerReservas)
router.get('/:id',     obtenerReserva)
router.post('/',       crearReserva)
router.put('/:id',     editarReserva)
router.patch('/:id',   actualizarEstadoReserva)
router.delete('/:id',  eliminarReserva)

module.exports = router
