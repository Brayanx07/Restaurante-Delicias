# 🍽️ Restaurante Delicias — Documentación del Proyecto

---

## 🌐 Links públicos

| Qué | URL |
|-----|-----|
| **Sitio web** | https://subtle-gumption-816bd6.netlify.app |
| **Panel de admin** | https://subtle-gumption-816bd6.netlify.app/admin |
| **API (backend)** | https://restaurante-delicias-production.up.railway.app |
| **API - Menú** | https://restaurante-delicias-production.up.railway.app/api/menu |
| **API - Reservas** | https://restaurante-delicias-production.up.railway.app/api/reservas |

---

## 🔐 Contraseñas y credenciales

| Qué | Valor |
|-----|-------|
| **Panel de admin** | `admin1234` |
| **MySQL local** | usuario: `root` / password: `Ninox2020` |
| **MySQL Railway** | ver variables en Railway |

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 19 + Vite |
| **Backend** | Node.js + Express |
| **Base de datos** | MySQL |
| **Estilos** | CSS puro (sin frameworks) |
| **Emails** | Resend API |
| **Routing** | React Router DOM |

---

## ☁️ Servicios en la nube

| Servicio | Para qué | Link |
|---------|---------|------|
| **Netlify** | Hosting del frontend | https://app.netlify.com |
| **Railway** | Backend + MySQL en la nube | https://railway.app |
| **Resend** | Envío de emails | https://resend.com |
| **GitHub** | Repositorio del código | https://github.com/Brayanx07/Restaurante-Delicias |

---

## 📁 Estructura del proyecto

```
restaurante/
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── App.jsx         # Página principal (menú, nosotros, contacto)
│   │   ├── Admin.jsx       # Panel de administración de reservas
│   │   ├── EditarReserva.jsx # Página para editar reserva desde email
│   │   ├── App.css
│   │   ├── Admin.css
│   │   └── EditarReserva.css
│   ├── public/
│   │   └── _redirects      # Fix de rutas para Netlify
│   └── .env                # Variables de entorno del frontend
│
└── backend/                # Node.js + Express
    ├── server.js           # Punto de entrada del servidor
    ├── config/
    │   ├── db.js           # Conexión a MySQL
    │   └── mailer.js       # Configuración de Resend (emails)
    ├── routes/
    │   ├── menu.js         # Rutas del menú
    │   └── reservas.js     # Rutas de reservas
    ├── controllers/
    │   ├── menuController.js
    │   └── reservasController.js
    ├── database.sql        # Esquema de la base de datos
    ├── seed.sql            # Datos del menú (platillos e imágenes)
    └── .env                # Variables de entorno del backend
```

---

## 🔌 Endpoints de la API

| Método | Ruta | Qué hace |
|--------|------|---------|
| GET | `/api/menu` | Trae todos los platillos |
| GET | `/api/menu/:id` | Trae un platillo por ID |
| GET | `/api/reservas` | Lista todas las reservas |
| GET | `/api/reservas/:id` | Trae una reserva por ID |
| POST | `/api/reservas` | Crea una nueva reserva |
| PUT | `/api/reservas/:id` | Edita una reserva completa |
| PATCH | `/api/reservas/:id` | Cambia el estado de una reserva |
| DELETE | `/api/reservas/:id` | Elimina una reserva |

---

## 🚀 Cómo volver a levantar el proyecto después de cerrar todo

### 1. Abrir el backend
```bash
cd /Users/brayanpinel/Documents/restaurante/backend
npm run dev
```
El servidor corre en `http://localhost:4000`

### 2. Abrir el frontend
```bash
cd /Users/brayanpinel/Documents/restaurante/frontend
npm run dev
```
El sitio corre en `http://localhost:5173` (o 5174 si el puerto está ocupado)

> ⚠️ Necesitás tener **dos terminales abiertas** al mismo tiempo: una para el backend y otra para el frontend.

---

## 🆘 Comandos de emergencia

### El sitio público cayó o no carga el menú
1. Entrá a https://railway.app y verificá que los servicios estén **Online**
2. Si el backend está caído, click en el servicio → **Deployments** → **Redeploy**
3. Si el frontend está caído, entrá a https://app.netlify.com → **Deploys** → **Trigger deploy**

### Hacer un nuevo deploy manualmente
```bash
cd /Users/brayanpinel/Documents/restaurante
git add .
git commit -m "descripcion del cambio"
git push
```
Netlify y Railway se actualizan automáticamente con cada push.

### Actualizar imágenes o platillos del menú
1. Editá el archivo `backend/seed.sql`
2. Corrés este comando:
```bash
mysql -u root -prqyBRBXVVmgzljYxjhMgkIgJnRVzGmjE -h thomas.proxy.rlwy.net -P 26347 railway < /Users/brayanpinel/Documents/restaurante/backend/seed.sql
```

### Cambiar un dato específico en la BD sin correr todo el seed
```bash
mysql -u root -prqyBRBXVVmgzljYxjhMgkIgJnRVzGmjE -h thomas.proxy.rlwy.net -P 26347 railway -e "UPDATE platillos SET imagen_url='URL' WHERE nombre='Nombre del Platillo';"
```

### Ver todas las reservas desde la terminal
```bash
mysql -u root -prqyBRBXVVmgzljYxjhMgkIgJnRVzGmjE -h thomas.proxy.rlwy.net -P 26347 railway -e "SELECT * FROM reservas;"
```

### Reiniciar el servidor local sin cerrar la terminal
En la terminal donde corre nodemon, escribí:
```
rs
```

---

## 📧 Emails automáticos

- Cuando alguien hace una reserva, **le llega un email de confirmación** con los detalles
- El email incluye un **link para modificar la reserva** que lleva a `/editar-reserva/:id`
- Los emails se envían con **Resend** desde `onboarding@resend.dev`
- En el plan gratuito de Resend, los emails solo llegan al correo verificado de la cuenta. Para enviar a cualquier cliente necesitás agregar un dominio propio en https://resend.com/domains

---

## 🗃️ Base de datos

- **Motor:** MySQL
- **Base de datos local:** `restaurante_delicias`
- **Base de datos en producción:** `railway` (en Railway)
- **Tablas:**
  - `categorias` — categorías del menú (Entradas, Mariscos, etc.)
  - `platillos` — platillos con nombre, descripción, precio e imagen
  - `reservas` — reservas con nombre, email, fecha, hora, personas y estado

---

## 🧑‍💻 Variables de entorno

### Backend (`backend/.env`)
```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Ninox2020
DB_NAME=restaurante_delicias
MYSQL_URL=mysql://root:...@thomas.proxy.rlwy.net:26347/railway
EMAIL_USER=ninopinel@gmail.com
EMAIL_PASS=hjhd gpth qmaw vfwe
RESEND_API_KEY=re_FKvt2xqJ_...
FRONTEND_PUBLIC_URL=https://subtle-gumption-816bd6.netlify.app
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=https://restaurante-delicias-production.up.railway.app
```

---

## 📱 Responsive

El sitio está optimizado para:
- 📱 Móvil (≤ 480px) — menú hamburguesa, 1 columna
- 📟 Tablet (≤ 768px) — 2 columnas, layout adaptado
- 🖥️ Desktop — diseño completo

---

## 🔮 Próximos pasos sugeridos

- [ ] Comprar un dominio personalizado (ej: `restaurantedelicias.com`) y configurarlo en Netlify y Resend
- [ ] Agregar un panel para gestionar platillos (sin tener que editar el seed.sql)
- [ ] Sistema de notificación al admin cuando llega una nueva reserva
- [ ] Integrar Google Maps en la sección de contacto
- [ ] Animaciones de entrada al hacer scroll
