const pool = require('../config/db')
const { enviarConfirmacion } = require('../config/mailer')

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

    // Enviar email de confirmación (sin bloquear la respuesta)
    enviarConfirmacion({ id: result.insertId, nombre, email, fecha, hora, personas, mensaje })
      .catch(err => console.error('Error al enviar email:', err))

    res.status(201).json({
      ok: true,
      mensaje: '¡Reserva recibida! Te enviamos un email de confirmación.',
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

// GET /api/reservas/:id — obtener una reserva por ID
const obtenerReserva = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservas WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ ok: false, mensaje: 'Reserva no encontrada' })
    res.json({ ok: true, data: rows[0] })
  } catch (error) {
    console.error('Error al obtener reserva:', error)
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' })
  }
}

// PUT /api/reservas/:id — editar una reserva completa
const editarReserva = async (req, res) => {
  const { nombre, email, telefono, fecha, hora, personas, mensaje } = req.body

  if (!nombre || !email || !fecha || !hora || !personas) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan campos obligatorios' })
  }

  try {
    const [result] = await pool.query(
      `UPDATE reservas SET nombre=?, email=?, telefono=?, fecha=?, hora=?, personas=?, mensaje=? WHERE id=?`,
      [nombre, email, telefono || null, fecha, hora, personas, mensaje || null, req.params.id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, mensaje: 'Reserva no encontrada' })
    res.json({ ok: true, mensaje: 'Reserva actualizada exitosamente' })
  } catch (error) {
    console.error('Error al editar reserva:', error)
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

module.exports = { obtenerReservas, obtenerReserva, crearReserva, editarReserva, actualizarEstadoReserva, eliminarReserva }
