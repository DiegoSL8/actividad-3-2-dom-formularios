// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta 1: POST /api/usuarios/verificar
// El frontend enviará los datos aquí cuando el usuario quite el foco (blur) de la casilla
router.post('/verificar', usuarioController.verificarDisponibilidad);

// Ruta 2: POST /api/usuarios/registro
// El frontend enviará los datos aquí cuando el usuario presione el botón "Registrarse"
router.post('/registro', usuarioController.registrarUsuario);

module.exports = router;