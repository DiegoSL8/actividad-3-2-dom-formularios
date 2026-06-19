// middlewares/errorHandler.js

/**
 * Middleware Global de Manejo de Errores Dinámico
 * Capaz de procesar errores 400, 401, 404, 409 y 500.
 */
const errorHandler = (err, req, res, next) => {
    // Si el error trae un código de estado, lo usamos. Si no, por defecto es 500.
    const statusCode = err.statusCode || 500;

    // Diccionario de errores comunes para respuestas más limpias
    const mensajesComunes = {
        400: 'Solicitud Incorrecta. Verifica los datos enviados.',
        401: 'No Autorizado. Falta token o credenciales.',
        403: 'Prohibido. No tienes permisos para esta acción.',
        404: 'Recurso no encontrado.',
        409: 'Conflicto de datos.',
        500: 'Error Interno del Servidor. Intente más tarde.'
    };

    // Usamos el mensaje específico del error, o el mensaje común por defecto
    const mensaje = err.message || mensajesComunes[statusCode] || 'Ocurrió un error inesperado.';

    // Registramos en la consola solo si es un error grave (500) para no ensuciar los logs con errores de usuario (400)
    if (statusCode === 500) {
        console.error(`[Error Crítico ${statusCode}]:`, err.stack);
    } else {
        console.warn(`[Aviso ${statusCode}]: ${mensaje}`);
    }

    // Devolvemos el JSON estructurado al Frontend
    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message: mensaje
        }
    });
};

module.exports = errorHandler;