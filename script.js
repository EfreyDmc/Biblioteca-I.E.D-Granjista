// Obtenemos los elementos del DOM
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Almacenar los usuarios registrados en localStorage o en un array temporal
let users = JSON.parse(localStorage.getItem('users')) || [];

// Manejar el registro
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const apodo = document.getElementById('apodo').value;
        const password = document.getElementById('reg_password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const errorMessage = document.getElementById('error_message');

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Confirmación de contraseña incorrecta';
            return;
        }

        // Verificar si el apodo ya existe
        if (users.some(user => user.apodo === apodo)) {
            errorMessage.textContent = 'El apodo ya está en uso';
            return;
        }

        // Guardar el nuevo usuario
        users.push({ nombre, apellido, apodo, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuario registrado exitosamente');
        registerForm.reset();
    });
}

// Manejar el inicio de sesión
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error_message');

        // Verificar si el usuario existe y la contraseña es correcta
        const user = users.find(user => user.apodo === username);

        if (!user) {
            errorMessage.textContent = 'Usuario incorrecto';
        } else if (user.password !== password) {
            errorMessage.textContent = 'Contraseña incorrecta';
        } else {
            alert('Inicio de sesión exitoso');
            window.location.href = 'welcome.html';
        }
    });
}
