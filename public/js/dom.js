// public/js/dom.js

/**
 * Objeto encargado de manipular exclusivamente la Interfaz de Usuario (DOM).
 * Cumple con el Principio de Responsabilidad Única.
 */
const DOM = {
    // Aplica la clase de éxito (borde verde, ícono check)
    mostrarExito: (idGrupo) => {
        const grupo = document.getElementById(idGrupo);
        grupo.classList.remove('error');
        grupo.classList.add('success');
    },

    // Aplica la clase de error (borde rojo, ícono warning) y establece el mensaje
    mostrarError: (idGrupo, mensaje) => {
        const grupo = document.getElementById(idGrupo);
        grupo.classList.remove('success');
        grupo.classList.add('error');
        grupo.querySelector('.error-message').innerText = mensaje;
    },

    // Limpia ambos estados (útil si el usuario borra todo el texto)
    limpiarEstado: (idGrupo) => {
        const grupo = document.getElementById(idGrupo);
        grupo.classList.remove('success', 'error');
    },

    // Activa o desactiva el botón de envío
    toggleBotonSubmit: (estadoValido) => {
        document.getElementById('btnSubmit').disabled = !estadoValido;
    }
};