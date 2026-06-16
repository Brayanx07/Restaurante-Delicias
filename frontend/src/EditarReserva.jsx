import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './EditarReserva.css'

const API = import.meta.env.VITE_API_URL

export default function EditarReserva() {
  const { id } = useParams()
  const [form, setForm] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [respuesta, setRespuesta] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/reservas/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          const r = data.data
          setForm({
            nombre:   r.nombre,
            email:    r.email,
            telefono: r.telefono || '',
            fecha:    r.fecha?.slice(0, 10),
            hora:     r.hora?.slice(0, 5),
            personas: r.personas,
            mensaje:  r.mensaje || '',
          })
        } else {
          setError('No se encontró la reserva.')
        }
      })
      .catch(() => setError('No se pudo conectar al servidor.'))
      .finally(() => setCargando(false))
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setRespuesta(null)

    try {
      const res = await fetch(`${API}/api/reservas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setRespuesta({ ok: data.ok, mensaje: data.mensaje })
    } catch {
      setRespuesta({ ok: false, mensaje: 'No se pudo conectar al servidor.' })
    } finally {
      setEnviando(false)
    }
  }

  if (cargando) return (
    <div className="editar-centro">
      <p className="editar-msg">Cargando tu reserva...</p>
    </div>
  )

  if (error) return (
    <div className="editar-centro">
      <p className="editar-msg error">{error}</p>
    </div>
  )

  return (
    <div className="editar-page">
      <div className="editar-box">
        <a href="/" className="editar-logo">Restaurante Delicias</a>
        <h2>Modificar Reserva</h2>
        <p>Actualizá los datos de tu reserva #{id}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text" name="nombre" placeholder="Tu nombre"
            value={form.nombre} onChange={handleChange} required
          />
          <input
            type="email" name="email" placeholder="Tu correo"
            value={form.email} onChange={handleChange} required
          />
          <input
            type="tel" name="telefono" placeholder="Teléfono (opcional)"
            value={form.telefono} onChange={handleChange}
          />
          <div className="editar-fila">
            <input
              type="date" name="fecha"
              value={form.fecha} onChange={handleChange} required
            />
            <input
              type="time" name="hora"
              value={form.hora} onChange={handleChange} required
            />
            <input
              type="number" name="personas" placeholder="Personas"
              min="1" max="20"
              value={form.personas} onChange={handleChange} required
            />
          </div>
          <textarea
            name="mensaje" placeholder="Mensaje adicional (opcional)"
            value={form.mensaje} onChange={handleChange}
          />

          {respuesta && (
            <p className={respuesta.ok ? 'editar-exito' : 'editar-error'}>
              {respuesta.mensaje}
            </p>
          )}

          <button type="submit" disabled={enviando}>
            {enviando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  )
}
