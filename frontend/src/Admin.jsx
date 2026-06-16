import { useState, useEffect } from 'react'
import './Admin.css'

const API = import.meta.env.VITE_API_URL

const ESTADOS = ['pendiente', 'confirmada', 'cancelada']

const COLORES = {
  pendiente:  '#ffb703',
  confirmada: '#4caf50',
  cancelada:  '#ff6b6b',
}

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false)
  const [password, setPassword]       = useState('')
  const [errorLogin, setErrorLogin]   = useState(false)

  const [reservas, setReservas]       = useState([])
  const [cargando, setCargando]       = useState(true)
  const [filtro, setFiltro]           = useState('todas')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'admin1234') {
      setAutenticado(true)
    } else {
      setErrorLogin(true)
      setTimeout(() => setErrorLogin(false), 2000)
    }
  }

  const fetchReservas = () => {
    setCargando(true)
    fetch(`${API}/api/reservas`)
      .then(res => res.json())
      .then(data => { if (data.ok) setReservas(data.data) })
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    if (autenticado) fetchReservas()
  }, [autenticado])

  const cambiarEstado = async (id, estado) => {
    await fetch(`${API}/api/reservas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    })
    fetchReservas()
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar esta reserva?')) return
    await fetch(`${API}/api/reservas/${id}`, { method: 'DELETE' })
    fetchReservas()
  }

  const reservasFiltradas = filtro === 'todas'
    ? reservas
    : reservas.filter(r => r.estado === filtro)

  // ===== LOGIN =====
  if (!autenticado) {
    return (
      <div className="admin-login">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Panel de Administración</h2>
          <p>Restaurante Delicias</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {errorLogin && <span className="login-error">Contraseña incorrecta</span>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }

  // ===== PANEL =====
  return (
    <div className="admin">
      <header className="admin-header">
        <h1>Panel de Reservas</h1>
        <button className="btn-logout" onClick={() => setAutenticado(false)}>Cerrar sesión</button>
      </header>

      {/* Resumen */}
      <div className="admin-stats">
        {ESTADOS.map(e => (
          <div className="stat" key={e}>
            <span className="stat-num" style={{ color: COLORES[e] }}>
              {reservas.filter(r => r.estado === e).length}
            </span>
            <span className="stat-label">{e.charAt(0).toUpperCase() + e.slice(1)}s</span>
          </div>
        ))}
        <div className="stat">
          <span className="stat-num">{reservas.length}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="admin-filtros">
        {['todas', ...ESTADOS].map(f => (
          <button
            key={f}
            className={`filtro-btn ${filtro === f ? 'activo' : ''}`}
            onClick={() => setFiltro(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Tabla */}
      {cargando ? (
        <p className="admin-cargando">Cargando reservas...</p>
      ) : reservasFiltradas.length === 0 ? (
        <p className="admin-cargando">No hay reservas {filtro !== 'todas' ? filtro + 's' : ''}.</p>
      ) : (
        <div className="tabla-wrapper">
          <table className="tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Personas</th>
                <th>Mensaje</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.nombre}</td>
                  <td>{r.email}</td>
                  <td>{r.telefono || '—'}</td>
                  <td>{new Date(r.fecha).toLocaleDateString('es-HN')}</td>
                  <td>{r.hora?.slice(0, 5)}</td>
                  <td>{r.personas}</td>
                  <td className="td-mensaje">{r.mensaje || '—'}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: COLORES[r.estado] }}>
                      {r.estado}
                    </span>
                  </td>
                  <td className="td-acciones">
                    {r.estado !== 'confirmada' && (
                      <button className="btn-confirmar" onClick={() => cambiarEstado(r.id, 'confirmada')}>
                        Confirmar
                      </button>
                    )}
                    {r.estado !== 'cancelada' && (
                      <button className="btn-cancelar" onClick={() => cambiarEstado(r.id, 'cancelada')}>
                        Cancelar
                      </button>
                    )}
                    <button className="btn-eliminar" onClick={() => eliminar(r.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
