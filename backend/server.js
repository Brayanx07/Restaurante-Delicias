require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const menuRoutes    = require('./routes/menu')
const reservasRoutes = require('./routes/reservas')

const app  = express()
const PORT = process.env.PORT || 4000

// Middlewares
app.use(cors({ origin: /^http:\/\/(localhost|192\.168\.\d+\.\d+):\d+$/ }))
app.use(express.json())

// Rutas
app.use('/api/menu',     menuRoutes)
app.use('/api/reservas', reservasRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ ok: true, mensaje: 'API Restaurante Delicias funcionando 🍽️' })
})

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
