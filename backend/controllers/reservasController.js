const pool = require('../config/db')

// GET /api/reservas — listar todas las reservas
const obtenerReservas = async (req, res) => {
  try {
    const [reservas] = await pool.query(
      'SELECT * FROM reservas ORDER BY fecha, hora'
    )
    res.json({ ok: true, data: reservas })
  } catch (error) {
    console.error('Error al obtener reservas:', error)
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' })
  }
}

// POST /api/reservas — crear una nueva reserva
const crearReserva = async (req, res) => {
  const { nombre, email, telefono, fecha, hora, personas, mensaje } = req.body

  if (!nombre || !email || !fecha || !hora || !personas) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Faltan campos obligatorios: nombre, email, fecha, hora, personas'
    })
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO reservas (nombre, email, telefono, fecha, hora, personas, mensaje)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, email, telefono || null, fecha, hora, personas, mensaje || null]
    )
    res.status(201).json({
      ok: true,
      mensaje: 'Reserva creada exitosamente',
      id: result.insertId
    })
  } catch (error) {
    console.error('Error al crear reserva:', error)
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' })
  }
}

// PATCH /api/reservas/:id — actualizar estado de una reserva
const actualizarEstadoReserva = async (req, res) => {
  const { estado } = req.body
  const estadosValidos = ['pendiente', 'confirmada', 'cancelada']

  if (!estado || !estadosValidos.includes(estado)) {
    return res.status(400).json({
      ok: false,
      mensaje: `Estado inválido. Usa: ${estadosValidos.join(', ')}`
    })
  }

  try {
    const [result] = await pool.query(
      'UPDATE reservas SET estado = ? WHERE id = ?',
      [estado, req.params.id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Reserva no encontrada' })
    }
    res.json({ ok: true, mensaje: `Reserva marcada como "${estado}"` })
  } catch (error) {
    console.error('Error al actualizar reserva:', error)
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' })
  }
}

// DELETE /api/reservas/:id — eliminar una reserva
const eliminarReserva = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM reservas WHERE id = ?',
      [req.params.id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Reserva no encontrada' })
    }
    res.json({ ok: true, mensaje: 'Reserva eliminada' })
  } catch (error) {
    console.error('Error al eliminar reserva:', error)
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' })
  }
}

module.exports = { obtenerReservas, crearReserva, actualizarEstadoReserva, eliminarReserva }
