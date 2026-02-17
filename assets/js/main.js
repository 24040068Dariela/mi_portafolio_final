// Funcionalidades principales del portafolio

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animaciones
    initAnimations();
    
    // Inicializar tooltips
    initTooltips();
    
    // Inicializar formularios
    initForms();
    
    // Smooth scroll para enlaces internos
    initSmoothScroll();
    
    // Inicializar sistema de navegación centralizado
    initNavigation();
});

// Inicializar animaciones
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .section-title, .feature-item, .bg-white').forEach(el => {
        observer.observe(el);
    });
}

// Inicializar tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(107, 63, 105, 0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '14px';
            tooltip.style.zIndex = '1000';
            tooltip.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - 35) + 'px';
            tooltip.style.left = (rect.left + rect.width/2) + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            
            document.body.appendChild(tooltip);
            this.tooltipElement = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// Inicializar formularios
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, complete todos los campos requeridos.');
            }
        });
    });
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para mostrar/ocultar contenido
function toggleContent(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hidden');
    }
}

// Función para copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

console.log('Portafolio Framework cargado correctamente');

// Inicializa navegación centralizada: asigna hrefs y click handlers a botones/links comunes
function initNavigation() {
    if (typeof PortafolioConfig === 'undefined') return;

    const map = {
        // Header
        'logo-link': 'index.html',
        'nav-inicio': 'index.html',
        'nav-unidad1': 'unidades/unidad1.html',
        'nav-unidad2': 'unidades/unidad2.html',
        'nav-unidad3': 'unidades/unidad3.html',
        'nav-about': 'about.html',

        // Footer
        'footer-inicio': 'index.html',
        'footer-unidad1': 'unidades/unidad1.html',
        'footer-unidad2': 'unidades/unidad2.html',
        'footer-unidad3': 'unidades/unidad3.html',
        'footer-about': 'about.html',

        // Contenido / botones
        'btn-explorar-unidades': '#unidades',
        'btn-unidad1': 'unidades/unidad1.html',
        'btn-unidad2': 'unidades/unidad2.html',
        'btn-unidad3': 'unidades/unidad3.html',
        'btn-volver-inicio': 'index.html',
        'btn-siguiente-unidad2': 'unidades/unidad2.html',
        'btn-unidad-anterior': 'unidades/unidad1.html',
        'btn-inicio': 'index.html'
    };

    Object.keys(map).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const path = map[id];

        // Si es ancla interna (hash), mantenerlo como tal
        if (typeof path === 'string' && path.startsWith('#')) {
            el.setAttribute('href', path);
            return;
        }

        // Construir URL absoluta usando PortafolioConfig
        const url = PortafolioConfig.url(path);

        // Si el elemento es un enlace, asignar href
        if (el.tagName.toLowerCase() === 'a') {
            el.setAttribute('href', url);
        } else {
            // Si es otro tipo de elemento (button, div), asignar click
            el.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = url;
            });
        }
    });
}
