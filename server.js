// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Cargar variables de entorno

// Importar Middlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// Inicializar la aplicación Express
const app = express();

// --- 1. Middlewares Base ---
app.use(cors()); // Permite peticiones cruzadas (Frontend -> Backend)
app.use(express.json()); // Permite al servidor entender JSON
app.use(logger); // Activa nuestro registro de consola

// --- 2. Servir el Frontend ---
// Le decimos a Express que la carpeta 'public' contiene los archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// --- 3. Rutas de la API (Las conectaremos en el próximo paso) ---
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

// --- 4. Manejo de Errores ---
// Middleware para Error 404 (Rutas que no existen)
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado (Error 404)' });
});

// Middleware Global (Error 500)
app.use(errorHandler);

// --- 5. Levantar el Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Frontend disponible en http://localhost:${PORT}`);
});