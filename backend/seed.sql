-- =============================================
--  Restaurante Delicias — Seed completo
--  Ejecutar: mysql -u root -p restaurante_delicias < seed.sql
-- =============================================

-- USE restaurante_delicias;

-- Limpiar datos anteriores
DELETE FROM platillos;
DELETE FROM categorias;
ALTER TABLE platillos AUTO_INCREMENT = 1;
ALTER TABLE categorias AUTO_INCREMENT = 1;

-- ===== CATEGORÍAS =====
INSERT INTO categorias (nombre) VALUES
  ('Entradas'),
  ('Platos Fuertes'),
  ('Mariscos'),
  ('Cortes Premium'),
  ('Postres'),
  ('Bebidas'),
  ('Alcohol');

-- ===== ENTRADAS (8) =====
INSERT INTO platillos (nombre, descripcion, precio, imagen_url, categoria_id) VALUES
  ('Alitas BBQ',           'Alitas de pollo bañadas en salsa BBQ ahumada servidas con papas fritas.',         120.00, 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f', 1),
  ('Nachos Especiales',    'Totopos con queso fundido, jalapeños, guacamole y crema agria.',                   95.00, 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d', 1),
  ('Dedos de Queso',       'Bastones de mozzarella empanizados y fritos con salsa marinara.',                  85.00, 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5', 1),
  ('Sopa del Día',         'Sopa casera preparada con ingredientes frescos seleccionados del día.',            70.00, 'https://images.unsplash.com/photo-1547592180-85f173990554', 1),
  ('Bruschetta',           'Pan tostado con tomate fresco, albahaca, ajo y aceite de oliva extra virgen.',     80.00, 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f', 1),
  ('Calamares Fritos',     'Aros de calamar empanizados y fritos con limón y salsa tártara.',                 110.00, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0', 1),
  ('Tabla de Embutidos',   'Selección de jamón serrano, chorizo, queso manchego y aceitunas.',                150.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', 1),
  ('Guacamole Artesanal',  'Aguacate fresco preparado al momento con tomate, cebolla, cilantro y limón.',      90.00, 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092', 1);

-- ===== PLATOS FUERTES (8) =====
INSERT INTO platillos (nombre, descripcion, precio, imagen_url, categoria_id) VALUES
  ('Hamburguesa Especial', 'Carne de res jugosa, queso cheddar, vegetales frescos y salsa de la casa.',       180.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', 2),
  ('Pollo a la Parrilla',  'Pechuga de pollo marinada en hierbas a la parrilla con arroz y ensalada.',        165.00, 'https://images.unsplash.com/photo-1532550907401-a500c9a57435', 2),
  ('Pasta Alfredo',        'Fettuccine en salsa alfredo cremosa con pollo y champiñones salteados.',           155.00, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', 2),
  ('Costillas BBQ',        'Costillas de cerdo ahumadas con salsa BBQ, coleslaw y papas al horno.',           220.00, 'https://images.unsplash.com/photo-1544025162-d76694265947', 2),
  ('Pollo al Curry',       'Pollo en salsa de curry con leche de coco servido con arroz basmati.',            170.00, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd', 2),
  ('Lasaña de Carne',      'Capas de pasta, carne molida, salsa bechamel y queso gratinado al horno.',        175.00, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3', 2),
  ('Chuleta de Cerdo',     'Chuleta de cerdo a la parrilla con puré de papa y vegetales asados.',             190.00, 'https://images.unsplash.com/photo-1432139555190-58524dae6a55', 2),
  ('Burrito de Res',       'Tortilla rellena de carne de res, frijoles, arroz, queso y guacamole.',           160.00, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f', 2);

-- ===== MARISCOS (8) =====
INSERT INTO platillos (nombre, descripcion, precio, imagen_url, categoria_id) VALUES
  ('Camarones al Ajillo',   'Camarones jumbo en mantequilla derretida con ajo y vino blanco.',                250.00, 'https://images.unsplash.com/photo-1625943553852-781891e49fa8', 3),
  ('Ceviche de Camarón',    'Camarones frescos marinados en limón con tomate, cebolla y cilantro.',           195.00, 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3', 3),
  ('Filete de Pescado',     'Filete de tilapia a la plancha con vegetales salteados y arroz blanco.',         185.00, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', 3),
  ('Mariscos a la Crema',   'Mix de camarones, calamar y mejillones en salsa cremosa de ajo y vino.',        280.00, 'https://images.unsplash.com/photo-1559742811-822873691df8', 3),
  ('Pulpo a la Gallega',    'Pulpo cocido con aceite de oliva, pimentón ahumado y papas.',                    320.00, 'https://images.unsplash.com/photo-1625943553852-781891e49fa8', 3),
  ('Paella de Mariscos',    'Arroz con azafrán, camarones, mejillones, almejas y calamar.',                   310.00, 'https://images.unsplash.com/photo-1534080564583-6be75777b70a', 3),
  ('Salmón a la Plancha',   'Filete de salmón con limón, alcaparras y puré de papa con cebollín.',            295.00, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288', 3),
  ('Langostinos Gratinados','Langostinos frescos al horno con salsa de mantequilla de ajo y queso.',          350.00, 'https://images.unsplash.com/photo-1625943553852-781891e49fa8', 3);

-- ===== CORTES PREMIUM (8) =====
INSERT INTO platillos (nombre, descripcion, precio, imagen_url, categoria_id) VALUES
  ('Ribeye 12oz',          'Ribeye marmoleado a la parrilla con mantequilla de hierbas y papas rústicas.',    450.00, 'https://images.unsplash.com/photo-1558030006-450675393462', 4),
  ('New York Strip',       'Corte NY strip jugoso término a elección con vegetales asados y chimichurri.',    420.00, 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6', 4),
  ('Filete Mignon',        'El corte más tierno envuelto en tocino con salsa de vino tinto y puré.',         490.00, 'https://images.unsplash.com/photo-1558030006-450675393462', 4),
  ('T-Bone 16oz',          'Clásico T-bone a las brasas con papas al horno y ensalada fresca.',              480.00, 'https://images.unsplash.com/photo-1544025162-d76694265947', 4),
  ('Churrasco Especial',   'Churrasco de res marinado servido con arroz, ensalada y plátanos maduros.',      350.00, 'https://images.unsplash.com/photo-1532550907401-a500c9a57435', 4),
  ('Tomahawk 24oz',        'Imponente corte tomahawk con hueso largo a las brasas para compartir.',          650.00, 'https://images.unsplash.com/photo-1558030006-450675393462', 4),
  ('Picanha Brasileña',    'Picanha de res al carbón con farofa, arroz y vinagreta brasileña.',              395.00, 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6', 4),
  ('Lomo Saltado',         'Lomo de res salteado con cebolla, tomate y papas fritas estilo peruano.',        370.00, 'https://images.unsplash.com/photo-1544025162-d76694265947', 4);

-- ===== POSTRES (8) =====
INSERT INTO platillos (nombre, descripcion, precio, imagen_url, categoria_id) VALUES
  ('Cheesecake',           'Postre cremoso con base de galleta y topping de frutos rojos.',                    95.00, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187', 5),
  ('Brownie con Helado',   'Brownie de chocolate tibio con bola de helado de vainilla y salsa de chocolate.',  90.00, 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e', 5),
  ('Tres Leches',          'Esponjoso pastel bañado en tres leches con crema chantilly y canela.',             85.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', 5),
  ('Flan de Caramelo',     'Flan casero con caramelo dorado y un toque de vainilla pura.',                     75.00, 'https://images.unsplash.com/photo-1551024506-0bccd828d307', 5),
  ('Waffles con Frutas',   'Waffles crujientes con fresas, banano, miel y crema batida.',                      95.00, 'https://images.unsplash.com/photo-1562376552-0d160a2f238d', 5),
  ('Volcán de Chocolate',  'Pastelito tibio de chocolate con centro líquido y helado de vainilla.',           100.00, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb', 5),
  ('Crepes de Nutella',    'Crepes delgados rellenos de Nutella con fresas y azúcar glass.',                   85.00, 'https://images.unsplash.com/photo-1519676867240-f03562e64548', 5),
  ('Tiramisú',             'Clásico postre italiano de mascarpone, café espresso y cacao en polvo.',           95.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', 5);

-- ===== BEBIDAS (8) =====
INSERT INTO platillos (nombre, descripcion, precio, imagen_url, categoria_id) VALUES
  ('Limonada Natural',     'Limonada preparada con limón fresco exprimido, agua y azúcar al gusto.',           55.00, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87', 6),
  ('Agua de Jamaica',      'Infusión fría de flor de jamaica sin conservantes ni colorantes artificiales.',    50.00, 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8', 6),
  ('Frappé de Café',       'Café frío batido con leche, hielo y topping de caramelo o chocolate.',             75.00, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735', 6),
  ('Jugo Natural',         'Jugo de naranja, sandía, melón o maracuyá exprimido al momento.',                  60.00, 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845', 6),
  ('Té Helado',            'Té negro o verde helado con limón, menta fresca y endulzante natural.',            55.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 6),
  ('Smoothie de Frutas',   'Batido de fresa, banano y mango con leche o leche de almendras.',                  70.00, 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82', 6),
  ('Horchata',             'Bebida tradicional de arroz con leche, canela y vainilla bien fría.',              55.00, 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8', 6),
  ('Café Americano',       'Café negro preparado con granos seleccionados tostados artesanalmente.',           45.00, 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6', 6);

-- ===== ALCOHOL (8) =====
INSERT INTO platillos (nombre, descripcion, precio, imagen_url, categoria_id) VALUES
  ('Margarita Clásica',    'Tequila blanco, triple sec y jugo de limón fresco con sal en el borde.',         110.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 7),
  ('Mojito',               'Ron blanco, menta fresca, jugo de limón, azúcar y soda refrescante.',            105.00, 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a', 7),
  ('Piña Colada',          'Ron, crema de coco y jugo de piña natural licuados con hielo frappé.',           115.00, 'https://images.unsplash.com/photo-1544145945-f90425340c7e', 7),
  ('Cerveza Nacional',     'Cerveza hondureña bien fría en botella o de barril.',                             60.00, 'https://images.unsplash.com/photo-1608270586620-248524c67de9', 7),
  ('Copa de Vino',         'Vino tinto Malbec o vino blanco Chardonnay de selección de la casa.',            120.00, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3', 7),
  ('Whisky en las Rocas',  'Whisky escocés o americano servido con hielo y ralladura de naranja.',           150.00, 'https://images.unsplash.com/photo-1527281400683-1aae777175f8', 7),
  ('Sangría de la Casa',   'Vino tinto con frutas frescas, brandy, jugo de naranja y canela.',               125.00, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd', 7),
  ('Gin Tonic',            'Gin premium con agua tónica, rodaja de limón y hierbas aromáticas.',             130.00, 'https://images.unsplash.com/photo-1527761939622-933c972a9c93', 7);
