// config.js - Configuración del Portafolio Framework
// Este archivo reemplaza las funciones de config.php e init.php

const PortafolioConfig = {
    // ============================================
    // CONFIGURACIÓN BÁSICA
    // ============================================
    
    // Información del Equipo
    ALUMNO1_NOMBRE: 'Paola Esmeralda Pérez Granados',
    ALUMNO2_NOMBRE: 'Karol Dariela Vazquez Telles',
    get ALUMNOS_DUPLA() {
        return `${this.ALUMNO1_NOMBRE} & ${this.ALUMNO2_NOMBRE}`;
    },
    
    // Información Académica
    CARRERA: 'Entornos Virtuales y Negocios Digitales',
    GRUPO: 'EVND-5A',
    MATERIA: 'Frameworks',
    CUATRIMESTRE: '5° Cuatrimestre',
    INSTITUCION: 'Universidad Tecnológica',
    
    // Configuración del Sitio
    SITIO_NOMBRE: 'Portafolio de Evidencias',
    SITIO_DESCRIPCION: 'Portafolio de evidencias académicas',
    get AUTOR() {
        return this.ALUMNOS_DUPLA;
    },
    
    // ============================================
    // URLs Y RUTAS
    // ============================================
    
    // Detectar URL base automáticamente
    get BASE_URL() {
        // Obtener la URL base del sitio
        const fullPath = window.location.pathname;
        const pathParts = fullPath.split('/');
        
        // Para desarrollo local
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Ajustar según la estructura de carpetas
            if (pathParts.includes('portafolio-fw')) {
                const index = pathParts.indexOf('portafolio-fw');
                return window.location.origin + pathParts.slice(0, index + 1).join('/') + '/';
            }
            return window.location.origin + '/portafolio-fw/';
        }
        
        // Para producción
        const protocol = window.location.protocol;
        const host = window.location.host;
        
        // Si está en la raíz del dominio
        if (pathParts.length <= 2) {
            return `${protocol}//${host}/`;
        }
        
        // Si está en una subcarpeta
        const folder = pathParts.slice(0, -1).join('/');
        return `${protocol}//${host}${folder}/`;
    },
    
    // URLs de assets
    get ASSETS_URL() {
        return this.BASE_URL + 'assets/';
    },
    
    get CSS_URL() {
        return this.ASSETS_URL + 'css/';
    },
    
    get JS_URL() {
        return this.ASSETS_URL + 'js/';
    },
    
    get IMAGES_URL() {
        return this.ASSETS_URL + 'images/';
    },
    
    // ============================================
    // FUNCIONES DE AYUDA
    // ============================================
    
    // Generar URL completa
    url(path = '') {
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        
        // Si ya es una URL completa
        if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('//')) {
            return cleanPath;
        }
        
        // Si empieza con ./, mantener relativo a la página actual
        if (cleanPath.startsWith('./')) {
            return cleanPath;
        }
        
        // Si empieza con ../, mantener relativo
        if (cleanPath.startsWith('../')) {
            return cleanPath;
        }
        
        return this.BASE_URL + cleanPath;
    },
    
    // Obtener URL de asset
    asset(path) {
        return this.ASSETS_URL + path;
    },
    
    // Obtener URL de imagen
    image(filename) {
        return this.IMAGES_URL + filename;
    },
    
    // Obtener URL de CSS
    css(filename) {
        return this.CSS_URL + filename;
    },
    
    // Obtener URL de JS
    js(filename) {
        return this.JS_URL + filename;
    },
    
    // ============================================
    // FUNCIONALIDADES ADICIONALES
    // ============================================
    
    // Detectar si estamos en modo desarrollo
    get isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('192.168.');
    },
    
    // Obtener página actual
    get currentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename || 'index.html';
    },
    
    // Inicializar configuración en la página
    init() {
        console.log(`Portafolio Framework iniciado - ${this.SITIO_NOMBRE}`);
        console.log(`Equipo: ${this.ALUMNOS_DUPLA}`);
        console.log(`URL Base: ${this.BASE_URL}`);
        console.log(`Modo: ${this.isDevelopment ? 'Desarrollo' : 'Producción'}`);
        
        // Hacer disponible globalmente
        window.PortafolioConfig = this;
        
        // Retornar la instancia para uso directo
        return this;
    }
};

// Inicializar automáticamente cuando se carga
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PortafolioConfig.init());
} else {
    PortafolioConfig.init();
}

// Exportar para módulos (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortafolioConfig;
}