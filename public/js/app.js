// public/js/app.js

// 1. Estado global del formulario (inicia todo en falso)
const estadoFormulario = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false
};

// 2. Mensajes de error específicos solicitados en la pauta
const mensajesError = {
    username: 'Debe tener al menos 6 caracteres (letras y/o números).',
    email: 'El formato del correo electrónico no es válido.',
    password: 'Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.',
    confirmPassword: 'Las contraseñas no coinciden.'
};

// 3. Función principal que se ejecuta al escribir
const validarCampo = (e) => {
    const campo = e.target.name; // Obtiene si es username, email, etc.
    const valor = e.target.value;
    const idGrupo = `grupo-${campo}`;

    // Si el campo está vacío, limpiamos la interfaz
    if (valor.trim() === '') {
        DOM.limpiarEstado(idGrupo);
        estadoFormulario[campo] = false;
        verificarFormulario();
        return;
    }

    let esValido = false;

    // Evaluamos qué campo se está escribiendo y llamamos a su validador
    switch (campo) {
        case 'username':
            esValido = validadores.esUsernameValido(valor);
            break;
        case 'email':
            esValido = validadores.esEmailValido(valor);
            break;
        case 'password':
            esValido = validadores.esPasswordValido(valor);
            validarConfirmacion(); // Re-validar confirmación si cambiamos la clave original
            break;
        case 'confirmPassword':
            const passwordOriginal = document.getElementById('password').value;
            esValido = validadores.coincidenPasswords(valor, passwordOriginal);
            break;
    }

    // Actualizamos el DOM y el estado global
    if (esValido) {
        DOM.mostrarExito(idGrupo);
        estadoFormulario[campo] = true;
    } else {
        DOM.mostrarError(idGrupo, mensajesError[campo]);
        estadoFormulario[campo] = false;
    }

    verificarFormulario();
};

// 4. Función auxiliar para forzar la validación de contraseñas cruzadas
const validarConfirmacion = () => {
    const inputConfirm = document.getElementById('confirmPassword');
    if (inputConfirm.value !== '') {
        const evento = new Event('keyup');
        inputConfirm.dispatchEvent(evento);
    }
};

// 5. Revisa si todo es verdadero para habilitar el botón "Registrarse"
const verificarFormulario = () => {
    const todoValido = Object.values(estadoFormulario).every(estado => estado === true);
    DOM.toggleBotonSubmit(todoValido);
};

// 6. Asignamos los eventos a todos los inputs
const inputs = document.querySelectorAll('#registroForm input');
inputs.forEach((input) => {
    input.addEventListener('keyup', validarCampo); // Valida al soltar tecla
    input.addEventListener('blur', validarCampo);  // Valida al hacer clic fuera del input
});

// 7. Evento final de envío
document.getElementById('registroForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página recargue
    if (Object.values(estadoFormulario).every(estado => estado === true)) {
        alert('¡Formulario validado con éxito! Todos los campos son correctos.');
        // Aquí conectaremos con Node.js después
    }
});

// 8. Funcionalidad para ver/ocultar contraseña
const togglePasswordIcons = document.querySelectorAll('.toggle-password');

togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        // Encontrar el input (hermano) dentro del mismo contenedor
        const input = this.parentElement.querySelector('input');

        // Alternar entre password y text
        if (input.type === 'password') {
            input.type = 'text';
            // Cambiar el ícono a "ojo tachado"
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            // Volver al ícono de "ojo normal"
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});