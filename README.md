# Proyecto Full-Stack: Sistema de Registro con Validación Asíncrona (DOM & Node.js)

Este repositorio contiene la resolución integral de la **Actividad 3.2 de Programación Web**. Se ha implementado un sistema de registro de usuarios robusto, escalable y estructurado bajo los principios de Arquitectura Modular y Separación de Responsabilidades (Separation of Concerns). 

El proyecto integra una interfaz Frontend interactiva que se comunica dinámicamente mediante Fetch API con un Backend RESTful desarrollado en Node.js, persistiendo los datos de manera segura en una base de datos MySQL.

## Funcionalidades Principales

### Interfaz de Usuario (Frontend)
- **Validación en Tiempo Real (Regex):** Reglas de negocio estrictas para usuarios, correos y contraseñas (mínimo 8 caracteres, mayúsculas, minúsculas, números).
- **Retroalimentación Visual Inmediata:** Manipulación dinámica del DOM para mostrar estados de éxito (verde) y error (rojo) junto con mensajes específicos.
- **Micro-interacciones UX/UI:** Implementación de "Glassmorphism", fondos animados, y botón *toggle* para visualizar/ocultar contraseñas.
- **Verificación Asíncrona:** Consulta al servidor al evento `blur` (perder foco) para verificar la disponibilidad del nombre de usuario y correo sin recargar la página.

### Motor de la Aplicación (Backend)
- **Arquitectura por Capas:** Separación lógica entre Rutas, Controladores y Middlewares.
- **Pool de Conexiones:** Gestión eficiente y segura de la base de datos MySQL.
- **Manejo de Errores Global:** Middleware centralizado para procesar y responder adecuadamente a códigos HTTP (400, 404, 409, 500).
- **Seguridad Integrada:** Protección contra *SQL Injection* mediante consultas preparadas (Prepared Statements) y gestión de credenciales con variables de entorno (`.env`).

---

## Stack Tecnológico

- **Frontend:** HTML5, CSS3 (Variables, Flexbox, Animations), JavaScript (Vanilla, Promesas, Fetch API, manipulación del DOM).
- **Backend:** Node.js, Express.js.
- **Base de Datos:** MySQL (XAMPP).
- **Herramientas:** Git, npm, CORS, Dotenv, Nodemon.

---

## 📂 Estructura del Proyecto

```text
📁 proyecto-registro/
├── 📁 config/
│   └── 📄 db.js                  # Pool de conexión a MySQL
├── 📁 controllers/
│   └── 📄 usuarioController.js   # Lógica de negocio (Consultas SQL)
├── 📁 middlewares/
│   ├── 📄 errorHandler.js        # Interceptor de errores dinámico
│   └── 📄 logger.js              # Trazabilidad de peticiones HTTP
├── 📁 public/                    # Frontend (Archivos estáticos servidos por Express)
│   ├── 📁 css/
│   │   └── 📄 style.css          # Estilos y Glassmorphism
│   ├── 📁 js/
│   │   ├── 📄 app.js             # Eventos, Asincronía y Fetch API
│   │   ├── 📄 dom.js             # Manipulación exclusiva de UI
│   │   └── 📄 validaciones.js    # Reglas Matemáticas / Regex
│   └── 📄 index.html             # Estructura del formulario
├── 📁 routes/
│   └── 📄 usuarioRoutes.js       # Definición de Endpoints (API)
├── 📄 .env.example               # Plantilla de variables de entorno
├── 📄 server.js                  # Entry point y configuración de Express
└── 📄 package.json               # Dependencias del proyecto


⚙️ Requisitos Previos
Asegúrate de tener instalados los siguientes entornos antes de ejecutar el proyecto:

Node.js (v14 o superior).

XAMPP (Para el servidor Apache y MySQL).

Git

🚀 Guía de Instalación y Ejecución
Sigue estos pasos para desplegar el proyecto en tu entorno local:

1. Clonar el repositorio
Bash
git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)
cd TU_REPOSITORIO
2. Instalar dependencias
Bash
npm install
3. Configurar la Base de Datos (MySQL)
Abre XAMPP y enciende los módulos Apache y MySQL.

Ingresa a phpMyAdmin (http://localhost/phpmyadmin).

Ejecuta el siguiente script SQL para crear la base de datos y la tabla:

SQL

CREATE DATABASE registro_usuarios;
USE registro_usuarios;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

4. Configurar Variables de Entorno
Crea un archivo llamado .env en la raíz del proyecto y agrega tus credenciales de conexión:

Fragmento de código:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=registro_usuarios


5. Levantar el Servidor
Ejecuta el entorno de desarrollo (con recarga automática):

Bash
npx nodemon server.js


6. Uso de la Aplicación
Abre tu navegador web y navega a la siguiente dirección:
http://localhost:3000

Intenta registrar datos válidos y verifica la inserción directa en tu base de datos mediante phpMyAdmin. 
Posteriormente, intenta registrar el mismo correo para evaluar la validación asíncrona del Error HTTP 409 (Conflicto).

Desarrollado aplicando buenas prácticas de Ingeniería de Software y código limpio.

