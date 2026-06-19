const mysql = require('mysql2');
require('dotenv').config();

// Crear el pool de conexiones utilizando las variables de entorno
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convertir el pool para que soporte Promesas (async/await)
const promisePool = pool.promise();

// Probar la conexión inicial para asegurarnos de que XAMPP responde
promisePool.getConnection()
    .then(connection => {
        console.log('✅ Conectado a la base de datos MySQL con éxito.');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error al conectar con la base de datos:', err.message);
    });

module.exports = promisePool;