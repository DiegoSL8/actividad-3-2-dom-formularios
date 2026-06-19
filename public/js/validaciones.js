// public/js/validaciones.js

/**
 * Objeto que contiene todas las funciones de validación pura.
 * Retornan 'true' si el valor cumple la regla, y 'false' si es inválido.
 */
const validadores = {
    // Requisito: Al menos 6 caracteres y no contenga caracteres especiales[cite: 49].
    // ^ = inicio, [a-zA-Z0-9] = solo letras y números, {6,} = 6 o más, $ = fin.
    esUsernameValido: (valor) => {
        const regex = /^[a-zA-Z0-9]{6,}$/;
        return regex.test(valor);
    },

    // Requisito: Formato válido de correo electrónico[cite: 50].
    esEmailValido: (valor) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(valor);
    },

    // Requisito: Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número[cite: 51].
    // Los "(?=.*[...])" son "lookaheads" que verifican la existencia de esos tipos de caracteres.
    esPasswordValido: (valor) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{8,}$/;
        return regex.test(valor);
    },

    // Requisito: Confirmar que coincide con la contraseña original[cite: 52].
    coincidenPasswords: (valor, passwordOriginal) => {
        return valor === passwordOriginal && valor.length > 0;
    }
};