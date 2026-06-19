// middlewares/logger.js

/**
 * Middleware de Trazabilidad (Logger)
 * Registra en la consola cada petición que entra al servidor.
 * Excelente práctica para depurar en desarrollo.
 */
const logger = (req, res, next) => {
    const fecha = new Date().toISOString();
    console.log(`[${fecha}] 🟢 Petición entrante: ${req.method} ${req.url}`);
    next(); // Pasa el control al siguiente middleware o ruta
};

module.exports = logger;