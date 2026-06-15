const pool = require('../config/db')

// GET /api/menu — todos los platillos disponibles
const obtenerMenu = async (req, res) => {
  try {
    const [platillos] = await pool.query(`
      SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen_url,
             c.nombre AS categoria
      FROM platillos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE p.disponible = TRUE
      ORDER BY c.id, p.nombre
    `)
    res.json({ ok: true, data: platillos })
  } catch (error) {
    console.error('Error al obtener menú:', error)
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' })
  }
}

// GET /api/menu/:id — un platillo por ID
const obtenerPlatillo = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, c.nombre AS categoria
       FROM platillos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.id = ? AND p.disponible = TRUE`,
      [req.params.id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Platillo no encontrado' })
    }
    res.json({ ok: true, data: rows[0] })
  } catch (error) {
    console.error('Error al obtener platillo:', error)
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' })
  }
}

module.exports = { obtenerMenu, obtenerPlatillo }
