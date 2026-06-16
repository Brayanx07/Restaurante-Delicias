-- =============================================
--  Restaurante Delicias — Esquema MySQL
-- =============================================

-- CREATE DATABASE IF NOT EXISTS restaurante_delicias;
-- USE restaurante_delicias;

-- Categorías del menú
CREATE TABLE IF NOT EXISTS categorias (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nombre    VARCHAR(100) NOT NULL
);

-- Platillos
CREATE TABLE IF NOT EXISTS platillos (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(150) NOT NULL,
  descripcion  TEXT,
  precio       DECIMAL(8, 2) NOT NULL,
  imagen_url   VARCHAR(500),
  categoria_id INT,
  disponible   BOOLEAN DEFAULT TRUE,
  creado_en    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Reservas
CREATE TABLE IF NOT EXISTS reservas (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(150) NOT NULL,
  email        VARCHAR(200) NOT NULL,
  telefono     VARCHAR(20),
  fecha        DATE NOT NULL,
  hora         TIME NOT NULL,
  personas     INT NOT NULL DEFAULT 1,
  mensaje      TEXT,
  estado       ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
  creado_en    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
--  Datos de ejemplo
-- =============================================

INSERT INTO categorias (nombre) VALUES
  ('Platos fuertes'),
  ('Ensaladas'),
  ('Bebidas'),
  ('Postres');

INSERT INTO platillos (nombre, descripcion, precio, imagen_url, categoria_id) VALUES
  ('Hamburguesa Especial', 'Carne jugosa, queso, vegetales frescos y salsa de la casa.', 180.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', 1),
  ('Ensalada Fresca',      'Mezcla de vegetales frescos con aderezo especial.',           120.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', 2),
  ('Limonada Natural',     'Bebida refrescante preparada con limón natural.',              55.00, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87', 3),
  ('Cheesecake',           'Postre cremoso con base crujiente y topping dulce.',           95.00, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187', 4);
