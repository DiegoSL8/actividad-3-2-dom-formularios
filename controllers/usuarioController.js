// controllers/usuarioController.js
const pool = require('../config/db');

// 1. Controlador para verificar disponibilidad (Reemplaza la dbSimulada)
const verificarDisponibilidad = async (req, res, next) => {
    try {
        // Recibimos el campo ('username' o 'email') y el valor que escribió el usuario
        const { campo, valor } = req.body;

        // Validación de seguridad: Asegurarnos de que no inyecten nombres de columnas maliciosas
        if (!['username', 'email'].includes(campo)) {
            const error = new Error('Campo de verificación inválido.');
            error.statusCode = 400;
            throw error;
        }

        // Consultamos a MySQL si existe algún registro con ese valor
        // Usamos [valor] para evitar SQL Injection
        const [rows] = await pool.query(`SELECT id FROM usuarios WHERE ${campo} = ? LIMIT 1`, [valor]);

        // Si rows.length es mayor a 0, significa que el usuario o correo ya existe
        if (rows.length > 0) {
            return res.json({ disponible: false });
        }

        // Si no encontró nada, está disponible
        return res.json({ disponible: true });

    } catch (error) {
        next(error); // Le pasamos el error a nuestro errorHandler global
    }
};

// 2. Controlador para registrar al usuario final
const registrarUsuario = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Doble validación en el Backend (Regla de oro: nunca confíes solo en el Frontend)
        if (!username || !email || !password) {
            const error = new Error('Todos los campos son obligatorios.');
            error.statusCode = 400;
            throw error;
        }

        // Verificar si mágicamente el correo o usuario ya fueron tomados en el último segundo
        const [existentes] = await pool.query(
            'SELECT id FROM usuarios WHERE username = ? OR email = ? LIMIT 1', 
            [username, email]
        );

        if (existentes.length > 0) {
            const error = new Error('El nombre de usuario o correo ya están en uso.');
            error.statusCode = 409; // Conflicto
            throw error;
        }

        // Si todo está correcto, guardamos en la base de datos MySQL
        // Nota: En un proyecto real, aquí haríamos un hash de la contraseña (con bcrypt) antes de guardarla.
        const [resultado] = await pool.query(
            'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );

        // Devolvemos la respuesta de éxito al Frontend
        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente en la base de datos.',
            usuarioId: resultado.insertId
        });

    } catch (error) {
        next(error); // Pasamos cualquier caída al middleware de errores
    }
};

// Exportamos nuestras funciones
module.exports = {
    verificarDisponibilidad,
    registrarUsuario
};