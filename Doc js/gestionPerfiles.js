class Perfil {
    constructor() {
        this.init();
        this.loadUserData();
    }

    init() {
        this.setupForm();
    }

    setupForm() {
        const form = document.getElementById('form-perfil');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProfile();
            });
        }
    }

    loadUserData() {
        const userData = this.getUserData();
        
        if (userData) {
            this.fillFormData(userData);
        }
    }

    getUserData() {
        const userData = localStorage.getItem('levelUpGamerUser');
        if (userData) {
            return JSON.parse(userData);
        }
    }

    fillFormData(userData) {
        document.getElementById('nombre').value = userData.nombre || '';
        document.getElementById('apellido').value = userData.apellido || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('telefono').value = userData.telefono || '';
        document.getElementById('fecha-nacimiento').value = userData.fechaNacimiento || '';
        document.getElementById('genero').value = userData.genero || '';
        document.getElementById('direccion').value = userData.direccion || '';
        document.getElementById('ciudad').value = userData.ciudad || '';
        document.getElementById('region').value = userData.region || '';
        document.getElementById('codigo-postal').value = userData.codigoPostal || '';
        document.getElementById('presupuesto').value = userData.presupuesto || '';
        document.getElementById('metodo-pago').value = userData.metodoPago || '';
    }

    saveProfile() {
        const formData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            fechaNacimiento: document.getElementById('fecha-nacimiento').value,
            genero: document.getElementById('genero').value,
            direccion: document.getElementById('direccion').value,
            ciudad: document.getElementById('ciudad').value,
            region: document.getElementById('region').value,
            codigoPostal: document.getElementById('codigo-postal').value,
            presupuesto: document.getElementById('presupuesto').value,
            metodoPago: document.getElementById('metodo-pago').value
        };

        // Validaciones básicas (sin validación de email)
        if (!formData.nombre.trim()) {
            this.showAlert('Error', 'El nombre es obligatorio', 'error');
            return;
        }

        if (!formData.apellido.trim()) {
            this.showAlert('Error', 'El apellido es obligatorio', 'error');
            return;
        }

        // Guardar en localStorage
        localStorage.setItem('levelUpGamerUser', JSON.stringify(formData));
        this.showAlert('Éxito', 'Perfil actualizado correctamente', 'success');
    }

    showAlert(titulo, mensaje, tipo) {
        const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
        const modalTitulo = document.getElementById('modalTitulo');
        const modalMensaje = document.getElementById('modalMensaje');
        
        modalTitulo.textContent = titulo;
        modalMensaje.textContent = mensaje;
        
        // Cambiar color del header según el tipo
        const modalHeader = document.querySelector('#modalConfirmacion .modal-header');
        modalHeader.className = 'modal-header';
        if (tipo === 'error') {
            modalHeader.classList.add('bg-danger', 'text-white');
        } else if (tipo === 'success') {
            modalHeader.classList.add('bg-success', 'text-white');
        } else {
            modalHeader.classList.add('bg-primary', 'text-white');
        }
        
        modal.show();
    }
}