import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [platillos, setPlatillos] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Estado del formulario de reservas
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '',
    fecha: '', hora: '', personas: 1, mensaje: ''
  })
  const [enviando, setEnviando] = useState(false)
  const [respuesta, setRespuesta] = useState(null) // { ok, mensaje }

  const cerrarMenu = () => setMenuAbierto(false)

  // Actualiza cualquier campo del form cuando el usuario escribe
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Se ejecuta cuando el usuario presiona "Enviar mensaje"
  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setRespuesta(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setRespuesta({ ok: data.ok, mensaje: data.mensaje })

      // Si fue exitoso, limpia el formulario
      if (data.ok) {
        setForm({ nombre: '', email: '', telefono: '', fecha: '', hora: '', personas: 1, mensaje: '' })
      }
    } catch {
      setRespuesta({ ok: false, mensaje: 'No se pudo conectar al servidor' })
    } finally {
      setEnviando(false)
    }
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/menu`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) setPlatillos(data.data)
        else setError('No se pudo cargar el menú')
      })
      .catch(() => setError('No se pudo conectar al servidor'))
      .finally(() => setCargando(false))
  }, [])

  return (
    <div className="app">
      <nav className="navbar">
        <h2>Restaurante Delicias</h2>

        <button
          className={`hamburguesa ${menuAbierto ? 'abierto' : ''}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${menuAbierto ? 'nav-abierto' : ''}`}>
          <a href="#inicio" onClick={cerrarMenu}>Inicio</a>
          <a href="#menu" onClick={cerrarMenu}>Menú</a>
          <a href="#nosotros" onClick={cerrarMenu}>Nosotros</a>
          <a href="#contacto" onClick={cerrarMenu}>Contacto</a>
        </div>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-content">
          <h1>Sabores que se sienten como en casa</h1>
          <p>Platillos, bebidas y postres preparados con amor.</p>
          <a href="#menu"><button>Ver menú</button></a>
        </div>
      </section>
      <section className="menu" id="menu">
        <h2>Nuestro Menú</h2>
        <p className="menu-texto">Disfrutá nuestros platillos, bebidas y postres favoritos.</p>

        {cargando && <p className="menu-estado">Cargando menú...</p>}
        {error    && <p className="menu-estado menu-error">{error}</p>}

        {!cargando && !error && (
          <>
            {/* Tabs de categorías */}
            <div className="categorias-tabs">
              {['Todos', ...new Set(platillos.map(p => p.categoria))].map(cat => (
                <button
                  key={cat}
                  className={`tab ${categoriaActiva === cat ? 'tab-activo' : ''}`}
                  onClick={() => setCategoriaActiva(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="menu-grid">
              {platillos
                .filter(p => categoriaActiva === 'Todos' || p.categoria === categoriaActiva)
                .map(p => (
                  <div className="card" key={p.id}>
                    <img src={p.imagen_url} alt={p.nombre} />
                    <h3>{p.nombre}</h3>
                    <p>{p.descripcion}</p>
                    <span>L. {Number(p.precio).toFixed(0)}</span>
                  </div>
                ))
              }
            </div>
          </>
        )}
      </section>

      <section className="nosotros" id="nosotros">
        <div className="nosotros-texto">
          <h2>Nosotros</h2>
          <p>Somos un restaurante familiar con más de 10 años de experiencia ofreciendo lo mejor de la gastronomía hondureña y fusión internacional.</p>
          <p>Cada platillo es preparado con ingredientes frescos y locales, cuidando cada detalle para que tu experiencia sea única.</p>
          <p>Nuestro equipo está comprometido con brindarte un servicio cálido y de calidad, como si estuvieras en casa.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0" alt="Restaurante interior" />
      </section>

      <section className="contacto" id="contacto">
        <h2>Contáctanos</h2>
        <p>¿Tenés alguna pregunta o querés hacer una reserva? Escribinos.</p>

        <div className="contacto-info">
          <div>
            <h4>Dirección</h4>
            <p>Col. Palmira, Tegucigalpa, Honduras</p>
          </div>
          <div>
            <h4>Teléfono</h4>
            <p>+504 2234-5678</p>
          </div>
          <div>
            <h4>Horario</h4>
            <p>Lun – Dom: 11:00 am – 10:00 pm</p>
          </div>
        </div>

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
            type="tel" name="telefono" placeholder="Tu teléfono (opcional)"
            value={form.telefono} onChange={handleChange}
          />
          <div className="form-fila">
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
          ></textarea>

          {respuesta && (
            <p className={respuesta.ok ? 'form-exito' : 'form-error'}>
              {respuesta.mensaje}
            </p>
          )}

          <button type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar reserva'}
          </button>
        </form>
      </section>

      <footer className="footer">
        <p>© 2024 Restaurante Delicias. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App