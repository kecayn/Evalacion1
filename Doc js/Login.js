document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioLogin');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;
        
        // Validación básica
        if (correo.trim() === '' || contraseña.trim() === '') {
            alert('Por favor, ingresa tu correo y contraseña.');
            return;
        }
        
        // Si la validación pasa, redirigir a la página principal
        window.location.href = 'index.html';
    });
});