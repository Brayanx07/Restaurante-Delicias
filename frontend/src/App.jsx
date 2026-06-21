import { useState, useEffect, useRef } from 'react'
import './App.css'

const SLOGANS = {
  'Entradas':       'El mejor comienzo para una gran experiencia.',
  'Platos Fuertes': 'Sabores que llenan el alma.',
  'Mariscos':       'Lo mejor del mar en tu mesa.',
  'Cortes Premium': 'Para los amantes de la carne perfecta.',
  'Postres':        'El dulce final que mereces.',
  'Bebidas':        'Refrescantes opciones para acompañar.',
  'Alcohol':        'Brindemos por los buenos momentos.',
}

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [platillos, setPlatillos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [catIdx, setCatIdx] = useState(0)
  const [animDir, setAnimDir] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const animTimeout = useRef(null)

  const cerrarMenu = () => setMenuAbierto(false)

  const irCat = (nuevoIdx, dir) => {
    if (animTimeout.current) clearTimeout(animTimeout.current)
    setAnimDir(dir)
    setCatIdx(nuevoIdx)
    animTimeout.current = setTimeout(() => setAnimDir(''), 500)
  }

  // Fetch menú
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

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.1 }
    )
    // Forzar visible en elementos ya en viewport, observar el resto
    document.querySelectorAll('.fade-up').forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        el.classList.add('visible')
      } else {
        observer.observe(el)
      }
    })
    return () => observer.disconnect()
  }, [platillos, busqueda]) // re-run cuando carguen platillos o cambie búsqueda

  // Estado del formulario de reservas
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '',
    fecha: '', hora: '', personas: 1, mensaje: ''
  })
  const [enviando, setEnviando] = useState(false)
  const [respuesta, setRespuesta] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

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
      if (data.ok) {
        setForm({ nombre: '', email: '', telefono: '', fecha: '', hora: '', personas: 1, mensaje: '' })
      }
    } catch {
      setRespuesta({ ok: false, mensaje: 'No se pudo conectar al servidor' })
    } finally {
      setEnviando(false)
    }
  }

  // Resultados de búsqueda
  const resultadosBusqueda = busqueda.trim()
    ? platillos.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busqueda.toLowerCase())
      )
    : []

  return (
    <div className="app">
      <nav className="navbar">
        <h2>Restaurante Delicias</h2>

        <button
          className={`hamburguesa ${menuAbierto ? 'abierto' : ''}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <span></span><span></span><span></span>
        </button>

        <div className={`nav-links ${menuAbierto ? 'nav-abierto' : ''}`}>
          <a href="#inicio" onClick={cerrarMenu}>Inicio</a>
          <a href="#menu" onClick={cerrarMenu}>Menú</a>
          <a href="#nosotros" onClick={cerrarMenu}>Nosotros</a>
          <a href="#contacto" onClick={cerrarMenu}>Contacto</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="inicio">
        <div className="hero-content fade-up">
          <h1>Sabores que se sienten como en casa</h1>
          <p>Platillos, bebidas y postres preparados con amor.</p>
          <a href="#menu"><button>Ver menú</button></a>
        </div>
      </section>

      {/* ── MENÚ ── */}
      <section className="menu" id="menu">
        <div className="fade-up">
          <h2>Nuestro Menú</h2>
          <p className="menu-texto">Disfrutá nuestros platillos, bebidas y postres favoritos.</p>
        </div>

        {/* Buscador */}
        {!cargando && !error && (
          <div className="buscador-wrapper fade-up">
            <span className="buscador-icono">🔍</span>
            <input
              className="buscador"
              type="text"
              placeholder="Buscar platillo o categoría..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button className="buscador-limpiar" onClick={() => setBusqueda('')}>✕</button>
            )}
          </div>
        )}

        {cargando && <p className="menu-estado">Cargando menú...</p>}
        {error    && <p className="menu-estado menu-error">{error}</p>}

        {/* ── Resultados de búsqueda ── */}
        {!cargando && !error && busqueda.trim() && (
          <div>
            {resultadosBusqueda.length === 0 ? (
              <p className="menu-estado">No se encontraron platillos para "{busqueda}"</p>
            ) : (
              <>
                <p className="busqueda-resultado">{resultadosBusqueda.length} resultado{resultadosBusqueda.length !== 1 ? 's' : ''} para "{busqueda}"</p>
                <div className="busqueda-grid">
                  {resultadosBusqueda.map(p => (
                    <div className="card" key={p.id}>
                      <div className="card-img-wrapper">
                        <img src={p.imagen_url} alt={p.nombre} />
                        {p.destacado ? <span className="badge-popular">⭐ Popular</span> : null}
                      </div>
                      <span className="card-categoria">{p.categoria}</span>
                      <h3>{p.nombre}</h3>
                      <p>{p.descripcion}</p>
                      <span>L. {Number(p.precio).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Libro ── */}
        {!cargando && !error && !busqueda.trim() && (() => {
          const categorias = [...new Set(platillos.map(p => p.categoria))]
          const catActual  = categorias[catIdx] || ''
          const items      = platillos.filter(p => p.categoria === catActual)
          const izq        = items.slice(0, 4)
          const der        = items.slice(4, 8)
          const imgIzq     = items[1]
          const imgDer     = items[5]

          return (
            <div className="libro-section fade-up">
              <div className="libro-row">
                <button
                  className="libro-flecha"
                  onClick={() => irCat(catIdx - 1, 'anterior')}
                  disabled={catIdx === 0}
                  aria-label="Categoría anterior"
                >‹</button>

                <div
                  className={`libro-pagina${animDir ? ` flip-${animDir}` : ''}`}
                  key={catIdx}
                >
                  {/* Columna izquierda */}
                  <div className="pagina-col">
                    <div className="pagina-encabezado">
                      <h3 className="pagina-cat">{catActual}</h3>
                      <p className="pagina-slogan">{SLOGANS[catActual]}</p>
                    </div>

                    <div className="platillos-lista">
                      {izq.map(p => (
                        <div className="platillo-item" key={p.id}>
                          <div className="platillo-linea">
                            <span className="platillo-nombre">
                              {p.nombre}
                              {p.destacado ? <span className="badge-mini">⭐ Popular</span> : null}
                            </span>
                            <span className="platillo-puntos" />
                            <span className="platillo-precio">L. {Number(p.precio).toFixed(0)}</span>
                          </div>
                          <p className="platillo-desc">{p.descripcion}</p>
                        </div>
                      ))}
                    </div>

                    {imgIzq && (
                      <div className="pagina-foto">
                        <img src={imgIzq.imagen_url} alt={imgIzq.nombre} />
                        <span>{imgIzq.nombre}</span>
                      </div>
                    )}
                  </div>

                  <div className="pagina-divisor" />

                  {/* Columna derecha */}
                  <div className="pagina-col">
                    {imgDer && (
                      <div className="pagina-foto">
                        <img src={imgDer.imagen_url} alt={imgDer.nombre} />
                        <span>{imgDer.nombre}</span>
                      </div>
                    )}

                    <div className="platillos-lista">
                      {der.map(p => (
                        <div className="platillo-item" key={p.id}>
                          <div className="platillo-linea">
                            <span className="platillo-nombre">
                              {p.nombre}
                              {p.destacado ? <span className="badge-mini">⭐ Popular</span> : null}
                            </span>
                            <span className="platillo-puntos" />
                            <span className="platillo-precio">L. {Number(p.precio).toFixed(0)}</span>
                          </div>
                          <p className="platillo-desc">{p.descripcion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="libro-flecha"
                  onClick={() => irCat(catIdx + 1, 'siguiente')}
                  disabled={catIdx === categorias.length - 1}
                  aria-label="Categoría siguiente"
                >›</button>
              </div>

              <div className="libro-dots">
                {categorias.map((cat, i) => (
                  <button
                    key={cat}
                    className={`libro-dot ${i === catIdx ? 'dot-activo' : ''}`}
                    onClick={() => irCat(i, i > catIdx ? 'siguiente' : 'anterior')}
                    title={cat}
                  />
                ))}
              </div>
              <p className="libro-num">{catActual} &mdash; {catIdx + 1} / {categorias.length}</p>
            </div>
          )
        })()}
      </section>

      {/* ── NOSOTROS ── */}
      <section className="nosotros" id="nosotros">
        <div className="nosotros-texto fade-up">
          <h2>Nosotros</h2>
          <p>Somos un restaurante familiar con más de 10 años de experiencia ofreciendo lo mejor de la gastronomía hondureña y fusión internacional.</p>
          <p>Cada platillo es preparado con ingredientes frescos y locales, cuidando cada detalle para que tu experiencia sea única.</p>
          <p>Nuestro equipo está comprometido con brindarte un servicio cálido y de calidad, como si estuvieras en casa.</p>
        </div>
        <img className="fade-up" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0" alt="Restaurante interior" />
      </section>

      {/* ── CONTACTO ── */}
      <section className="contacto" id="contacto">
        <div className="fade-up">
          <h2>Contáctanos</h2>
          <p>¿Tenés alguna pregunta o querés hacer una reserva? Escribinos.</p>
        </div>

        <div className="contacto-info fade-up">
          <div><h4>Dirección</h4><p>Col. Palmira, Tegucigalpa, Honduras</p></div>
          <div><h4>Teléfono</h4><p>+504 2234-5678</p></div>
          <div><h4>Horario</h4><p>Lun – Dom: 11:00 am – 10:00 pm</p></div>
        </div>

        <form className="fade-up" onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Tu correo" value={form.email} onChange={handleChange} required />
          <input type="tel" name="telefono" placeholder="Tu teléfono (opcional)" value={form.telefono} onChange={handleChange} />
          <div className="form-fila">
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
            <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
            <input type="number" name="personas" placeholder="Personas" min="1" max="20" value={form.personas} onChange={handleChange} required />
          </div>
          <textarea name="mensaje" placeholder="Mensaje adicional (opcional)" value={form.mensaje} onChange={handleChange}></textarea>

          {respuesta && (
            <p className={respuesta.ok ? 'form-exito' : 'form-error'}>{respuesta.mensaje}</p>
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
