class PerfilUsuario {
    constructor() {
        this.init();
        this.loadUserData();
    }

    init() {
        this.setupNavigation();
        this.setupForms();
    }

    setupNavigation() {
        // Navegación entre secciones
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        const sections = document.querySelectorAll('.section-content');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remover clase active de todos los links
                navLinks.forEach(l => l.classList.remove('active'));
                // Agregar clase active al link clickeado
                link.classList.add('active');
                
                // Ocultar todas las secciones
                sections.forEach(section => section.classList.add('d-none'));
                // Mostrar la sección seleccionada
                const targetSection = document.getElementById(link.dataset.section);
                if (targetSection) {
                    targetSection.classList.remove('d-none');
                }
            });
        });
    }

    setupForms() {
        // Formulario de información personal
        const formInfoPersonal = document.getElementById('form-info-personal');
        if (formInfoPersonal) {
            formInfoPersonal.addEventListener('submit', (e) => {
                e.preventDefault();
                this.savePersonalInfo();
            });
        }

        // Formulario de preferencias
        const formPreferencias = document.getElementById('form-preferencias');
        if (formPreferencias) {
            formPreferencias.addEventListener('submit', (e) => {
                e.preventDefault();
                this.savePreferences();
            });
        }

        // Formulario de cambio de contraseña
        const formPassword = document.getElementById('form-password');
        if (formPassword) {
            formPassword.addEventListener('submit', (e) => {
                e.preventDefault();
                this.changePassword();
            });
        }
    }

    loadUserData() {
        // Cargar datos del localStorage o de una API
        const userData = this.getUserData();
        
        if (userData) {
            this.fillPersonalInfo(userData);
            this.fillPreferences(userData.preferences || {});
        }
    }

    getUserData() {
        // Simular carga de datos desde localStorage
        const userData = localStorage.getItem('levelUpGamerUser');
        if (userData) {
            return JSON.parse(userData);
        }
        
        // Datos de ejemplo
        return {
            nombre: 'Juan',
            apellido: 'Pérez',
            email: 'juan.perez@email.com',
            telefono: '+56912345678',
            fechaNacimiento: '1990-05-15',
            genero: 'masculino',
            direccion: 'Av. Principal 123',
            ciudad: 'Santiago',
            region: 'metropolitana',
            codigoPostal: '7500000',
            preferences: {
                categorias: ['consolas', 'juegos'],
                presupuesto: 'medio',
                notificaciones: {
                    ofertas: true,
                    nuevos: false,
                    newsletter: true
                },
                metodoPago: 'webpay'
            }
        };
    }

    fillPersonalInfo(userData) {
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
    }

    fillPreferences(preferences) {
        // Categorías de interés
        if (preferences.categorias) {
            preferences.categorias.forEach(categoria => {
                const checkbox = document.getElementById(`pref-${categoria}`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }

        // Presupuesto
        if (preferences.presupuesto) {
            document.getElementById('presupuesto').value = preferences.presupuesto;
        }

        // Notificaciones
        if (preferences.notificaciones) {
            document.getElementById('notif-ofertas').checked = preferences.notificaciones.ofertas || false;
            document.getElementById('notif-nuevos').checked = preferences.notificaciones.nuevos || false;
            document.getElementById('notif-newsletter').checked = preferences.notificaciones.newsletter || false;
        }

        // Método de pago
        if (preferences.metodoPago) {
            document.getElementById('metodo-pago').value = preferences.metodoPago;
        }
    }

    savePersonalInfo() {
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
            codigoPostal: document.getElementById('codigo-postal').value
        };

        // Validaciones básicas
        if (!formData.nombre.trim()) {
            this.showAlert('Error', 'El nombre es obligatorio', 'error');
            return;
        }

        if (!formData.apellido.trim()) {
            this.showAlert('Error', 'El apellido es obligatorio', 'error');
            return;
        }

        if (!this.validateEmail(formData.email)) {
            this.showAlert('Error', 'Email inválido', 'error');
            return;
        }

        // Guardar en localStorage
        let userData = this.getUserData();
        userData = { ...userData, ...formData };
        localStorage.setItem('levelUpGamerUser', JSON.stringify(userData));

        this.showAlert('Éxito', 'Información personal actualizada correctamente', 'success');
    }

    savePreferences() {
        // Obtener categorías seleccionadas
        const categorias = [];
        const checkboxesCategorias = document.querySelectorAll('input[type="checkbox"][id^="pref-"]:checked');
        checkboxesCategorias.forEach(checkbox => {
            categorias.push(checkbox.value);
        });

        const preferences = {
            categorias: categorias,
            presupuesto: document.getElementById('presupuesto').value,
            notificaciones: {
                ofertas: document.getElementById('notif-ofertas').checked,
                nuevos: document.getElementById('notif-nuevos').checked,
                newsletter: document.getElementById('notif-newsletter').checked
            },
            metodoPago: document.getElementById('metodo-pago').value
        };

        // Guardar en localStorage
        let userData = this.getUserData();
        userData.preferences = preferences;
        localStorage.setItem('levelUpGamerUser', JSON.stringify(userData));

        this.showAlert('Éxito', 'Preferencias guardadas correctamente', 'success');
    }

    changePassword() {
        const passwordActual = document.getElementById('password-actual').value;
        const passwordNueva = document.getElementById('password-nueva').value;
        const passwordConfirmar = document.getElementById('password-confirmar').value;

        // Validaciones
        if (!passwordActual) {
            this.showAlert('Error', 'Debe ingresar la contraseña actual', 'error');
            return;
        }

        if (passwordNueva.length < 8) {
            this.showAlert('Error', 'La nueva contraseña debe tener al menos 8 caracteres', 'error');
            return;
        }

        if (passwordNueva !== passwordConfirmar) {
            this.showAlert('Error', 'Las contraseñas no coinciden', 'error');
            return;
        }

        // Simular verificación de contraseña actual
        // En una aplicación real, esto se haría en el servidor
        const userData = this.getUserData();
        if (userData.password && userData.password !== passwordActual) {
            this.showAlert('Error', 'La contraseña actual es incorrecta', 'error');
            return;
        }

        // Guardar nueva contraseña
        userData.password = passwordNueva;
        localStorage.setItem('levelUpGamerUser', JSON.stringify(userData));

        // Limpiar formulario
        document.getElementById('form-password').reset();

        this.showAlert('Éxito', 'Contraseña cambiada correctamente', 'success');
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

    // Método para exportar datos del usuario (función extra)
    exportUserData() {
        const userData = this.getUserData();
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'mi-perfil-levelup-gamer.json';
        link.click();
    }

    // Método para eliminar cuenta (función extra)
    deleteAccount() {
        if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('levelUpGamerUser');
            this.showAlert('Cuenta Eliminada', 'Tu cuenta ha sido eliminada exitosamente', 'success');
            
            // Redirigir después de 3 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new PerfilUsuario();
});