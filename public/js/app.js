// public/js/app.js

// 1. Estado global del formulario
const estadoFormulario = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false
};

// 2. Mensajes de error específicos
const mensajesError = {
    username: 'Debe tener al menos 6 caracteres (letras y/o números).',
    email: 'El formato del correo electrónico no es válido.',
    password: 'Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.',
    confirmPassword: 'Las contraseñas no coinciden.'
};

// --- NUEVO: Simulación de Base de Datos ---
const dbSimulada = {
    // Corregido: Nombres de usuario válidos (Mínimo 6 caracteres, sin caracteres especiales)
    usernames: ['adminsys', 'devsenior', 'usuario123'],
    emails: ['admin@correo.com', 'test@test.com', 'hola@mundo.com']
};

// Función que simula el retraso de una consulta real al servidor
const simularConsultaDB = (tipo, valor) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (tipo === 'username') {
                resolve(!dbSimulada.usernames.includes(valor)); // true si NO está en uso
            } else if (tipo === 'email') {
                resolve(!dbSimulada.emails.includes(valor));    // true si NO está en uso
            }
        }, 1200); // 1.2 segundos de retraso para que el usuario note el efecto
    });
};
// ------------------------------------------

// 3. Función principal que se ejecuta al escribir
const validarCampo = (e) => {
    const campo = e.target.name; 
    const valor = e.target.value;
    const idGrupo = `grupo-${campo}`;
    const small = document.querySelector(`#${idGrupo} .error-message`);

    // Resetear estilos inline si existían de la validación asíncrona
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

// --- NUEVO: Verificación Asíncrona en el Blur ---
const verificarDisponibilidadAsincrona = async (e) => {
    const campo = e.target.name;
    const valor = e.target.value;
    const idGrupo = `grupo-${campo}`;
    const small = document.querySelector(`#${idGrupo} .error-message`);

    // Solo consultamos la "BD" si el campo es usuario/correo y si ya pasó la validación Regex (está verde)
    if ((campo === 'username' || campo === 'email') && estadoFormulario[campo]) {
        
        // Efecto visual de carga
        small.innerText = 'Verificando disponibilidad...';
        small.style.visibility = 'visible';
        small.style.opacity = '1';
        small.style.color = '#6b7280'; // Gris
        DOM.toggleBotonSubmit(false); // Bloqueamos el botón mientras piensa

        // Llamada a nuestra base de datos simulada
        const estaDisponible = await simularConsultaDB(campo, valor);

        if (estaDisponible) {
            DOM.mostrarExito(idGrupo);
            small.innerText = campo === 'username' ? 'Nombre de usuario disponible' : 'Correo electrónico disponible';
            small.style.color = 'var(--success-color)';
            estadoFormulario[campo] = true;
        } else {
            DOM.mostrarError(idGrupo, campo === 'username' ? 'Nombre de usuario no disponible' : 'Correo electrónico no disponible');
            estadoFormulario[campo] = false;
        }
        verificarFormulario(); 
    }
};

// 4. Función auxiliar
const validarConfirmacion = () => {
    const inputConfirm = document.getElementById('confirmPassword');
    if (inputConfirm.value !== '') {
        const evento = new Event('keyup');
        inputConfirm.dispatchEvent(evento);
    }
};

// 5. Revisa si todo es verdadero
const verificarFormulario = () => {
    const todoValido = Object.values(estadoFormulario).every(estado => estado === true);
    DOM.toggleBotonSubmit(todoValido);
};

// 6. Asignamos los eventos
const inputs = document.querySelectorAll('#registroForm input');
inputs.forEach((input) => {
    input.addEventListener('keyup', validarCampo); 
    
    // Al perder el foco, validamos regex y luego verificamos disponibilidad
    input.addEventListener('blur', (e) => {
        validarCampo(e);
        verificarDisponibilidadAsincrona(e);
    });
});

// 7. Evento final de envío
document.getElementById('registroForm').addEventListener('submit', (e) => {
    e.preventDefault(); 
    if (Object.values(estadoFormulario).every(estado => estado === true)) {
        alert('¡Formulario validado con éxito! Todos los campos son correctos.');
        // Aquí se conectará el Frontend con el Backend
    }
});

// 8. Funcionalidad Ver Contraseña
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