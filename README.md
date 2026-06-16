# 🍽️ Restaurante Delicias

Sitio web oficial de **Restaurante Delicias** — una plataforma completa para explorar nuestro menú, hacer reservas en línea y gestionar la experiencia del cliente.

🌐 **[Ver sitio en vivo](https://subtle-gumption-816bd6.netlify.app)**

---

## ✨ Características

- Menú completo con 7 categorías y más de 56 platillos
- Filtros interactivos por categoría
- Formulario de reservas con confirmación por email
- Email automático al cliente con link para modificar su reserva
- Panel de administración para gestionar reservas
- Diseño responsive para móvil, tablet y desktop

---

## 🛠️ Stack tecnológico

### Frontend
- **React 19** — librería de interfaz de usuario
- **Vite** — bundler y servidor de desarrollo
- **React Router DOM** — navegación entre páginas
- **CSS puro** — estilos sin frameworks

### Backend
- **Node.js** — entorno de ejecución
- **Express** — framework para la API REST
- **MySQL2** — driver para la base de datos

### Base de datos
- **MySQL** — base de datos relacional

### APIs y servicios externos
- **Resend** — envío de emails transaccionales
- **Unsplash** — imágenes de los platillos

### Hosting
- **Netlify** — deploy del frontend
- **Railway** — deploy del backend y base de datos en la nube

### Control de versiones
- **Git + GitHub** — repositorio y control de cambios

---

## 📁 Estructura del proyecto

```
restaurante/
├── frontend/          # React + Vite
│   └── src/
│       ├── App.jsx           # Página principal
│       ├── Admin.jsx         # Panel de reservas
│       └── EditarReserva.jsx # Edición de reservas
│
└── backend/           # Node.js + Express
    ├── server.js
    ├── config/
    ├── routes/
    └── controllers/
```

---

## 🔌 API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/menu` | Obtener todos los platillos |
| GET | `/api/menu/:id` | Obtener un platillo |
| GET | `/api/reservas` | Listar reservas |
| POST | `/api/reservas` | Crear una reserva |
| PUT | `/api/reservas/:id` | Editar una reserva |
| PATCH | `/api/reservas/:id` | Cambiar estado de reserva |
| DELETE | `/api/reservas/:id` | Eliminar una reserva |

---

## 🚀 Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/Brayanx07/Restaurante-Delicias.git
cd Restaurante-Delicias

# Backend
cd backend
npm install
cp .env.example .env   # Llenar con tus credenciales
npm run dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

---

Espero les guste,
Desarrollado con ❤️ por Brayan Pinel
