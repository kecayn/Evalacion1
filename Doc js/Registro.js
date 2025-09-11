        //
document.addEventListener('DOMContentLoaded', function() { 
    // seleccionamos el id re formulario registro
    const formulario = document.getElementById('formularioRegistro');

    // addEventListener es
    formulario.addEventListener('submit', function(event) {
        // Previene el envío del formulario por defecto para poder hacer validaciones
        event.preventDefault();

        // 3. Obtener los valores de los campos de correo y edad
        const edadInput = document.getElementById('edad').value;
        const correoInput = document.getElementById('correo').value;
        
        // Convertir el valor de la edad a un número entero
        const edad = parseInt(edadInput, 10);

        // 4. Realizar la validación de la edad
        if (edad < 18) {
            alert('Debes ser mayor de 18 años para registrarte.');
            return; // Detiene la ejecución de la función si la edad no es válida
        }

        // 5. Realizar la validación del correo para el descuento
        if (correoInput.includes('@duocuc.cl')) {
            alert('¡Registro exitoso! Tienes un 20% de descuento de por vida.');
        } else {
            alert('¡Registro exitoso!');
        }
            
    });
});