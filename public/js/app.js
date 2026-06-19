// public/js/app.js

const estadoFormulario = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false
};

const mensajesError = {
    username: 'Debe tener al menos 6 caracteres (letras y/o números).',
    email: 'El formato del correo electrónico no es válido.',
    password: 'Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.',
    confirmPassword: 'Las contraseñas no coinciden.'
};

// 1. Función de validación local (Regex)
const validarCampo = (e) => {
    const campo = e.target.name;
    const valor = e.target.value;
    const idGrupo = `grupo-${campo}`;
    const small = document.querySelector(`#${idGrupo} .error-message`);

    // Resetear estilos del asincronismo
    small.style.visibility = '';
    small.style.opacity = '';
    small.style.color = '';

    if (valor.trim() === '') {
        DOM.limpiarEstado(idGrupo);
        estadoFormulario[campo] = false;
        verificarFormulario();
        return;
    }

    let esValido = false;

    switch (campo) {
        case 'username':
            esValido = validadores.esUsernameValido(valor);
            break;
        case 'email':
            esValido = validadores.esEmailValido(valor);
            break;
        case 'password':
            esValido = validadores.esPasswordValido(valor);
            validarConfirmacion();
            break;
        case 'confirmPassword':
            const passwordOriginal = document.getElementById('password').value;
            esValido = validadores.coincidenPasswords(valor, passwordOriginal);
            break;
    }

    if (esValido) {
        DOM.mostrarExito(idGrupo);
        estadoFormulario[campo] = true;
    } else {
        DOM.mostrarError(idGrupo, mensajesError[campo]);
        estadoFormulario[campo] = false;
    }

    verificarFormulario();
};

// --- NUEVO: CONEXIÓN REAL AL BACKEND (Verificar Disponibilidad) ---
const verificarDisponibilidadAsincrona = async (e) => {
    const campo = e.target.name;
    const valor = e.target.value;
    const idGrupo = `grupo-${campo}`;
    const small = document.querySelector(`#${idGrupo} .error-message`);

    if ((campo === 'username' || campo === 'email') && estadoFormulario[campo]) {
        
        small.innerText = 'Consultando servidor...';
        small.style.visibility = 'visible';
        small.style.opacity = '1';
        small.style.color = '#6b7280';
        DOM.toggleBotonSubmit(false);

        try {
            // Petición HTTP POST a nuestra propia API
            const respuesta = await fetch('/api/usuarios/verificar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ campo, valor })
            });

            const data = await respuesta.json();

            if (data.disponible) {
                DOM.mostrarExito(idGrupo);
                small.innerText = campo === 'username' ? 'Nombre de usuario disponible' : 'Correo electrónico disponible';
                small.style.color = 'var(--success-color)';
                estadoFormulario[campo] = true;
            } else {
                DOM.mostrarError(idGrupo, campo === 'username' ? 'Nombre de usuario no disponible' : 'Correo electrónico no disponible');
                estadoFormulario[campo] = false;
            }
        } catch (error) {
            console.error("Error del Servidor:", error);
            DOM.mostrarError(idGrupo, 'Error al conectar con la base de datos.');
            estadoFormulario[campo] = false;
        }
        
        verificarFormulario();
    }
};

const validarConfirmacion = () => {
    const inputConfirm = document.getElementById('confirmPassword');
    if (inputConfirm.value !== '') {
        const evento = new Event('keyup');
        inputConfirm.dispatchEvent(evento);
    }
};

const verificarFormulario = () => {
    const todoValido = Object.values(estadoFormulario).every(estado => estado === true);
    DOM.toggleBotonSubmit(todoValido);
};

const inputs = document.querySelectorAll('#registroForm input');
inputs.forEach((input) => {
    input.addEventListener('keyup', validarCampo);
    input.addEventListener('blur', (e) => {
        validarCampo(e);
        verificarDisponibilidadAsincrona(e);
    });
});

// --- NUEVO: CONEXIÓN REAL AL BACKEND (Registrar Usuario) ---
document.getElementById('registroForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    if (Object.values(estadoFormulario).every(estado => estado === true)) {
        
        const btnSubmit = document.getElementById('btnSubmit');
        btnSubmit.disabled = true;
        btnSubmit.innerText = 'Registrando en MySQL...';

        // Recolectamos los datos del formulario
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Enviamos los datos a la ruta de registro
            const respuesta = await fetch('/api/usuarios/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                // Alerta de éxito real
                alert(`✅ ¡Éxito! ${data.message} (ID: ${data.usuarioId})`);
                
                // Limpiamos el formulario y los estados
                document.getElementById('registroForm').reset();
                Object.keys(estadoFormulario).forEach(key => estadoFormulario[key] = false);
                inputs.forEach(input => DOM.limpiarEstado(`grupo-${input.name}`));
                
            } else {
                // Si el servidor arroja un 400 o 409, lo mostramos
                alert(`❌ Error: ${data.error.message}`);
            }

        } catch (error) {
            alert('❌ Error crítico al intentar conectar con el servidor.');
        } finally {
            btnSubmit.innerText = 'Registrarse';
            verificarFormulario();
        }
    }
});

// Funcionalidad Ver Contraseña
const togglePasswordIcons = document.querySelectorAll('.toggle-password');
togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});