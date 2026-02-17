// config.js - Configuración central del Portafolio Framework
const PortafolioConfig = {
    // ============================================
    // INFORMACIÓN DEL EQUIPO Y ACADÉMICA
    // ============================================
    ALUMNO1_NOMBRE: 'Paola Esmeralda Pérez Granados',
    ALUMNO2_NOMBRE: 'Karol Dariela Vazquez Telles',
    CARRERA: 'Entornos Virtuales y Negocios Digitales',
    GRUPO: 'EVND-5A',
    MATERIA: 'Frameworks',
    CUATRIMESTRE: '5° Cuatrimestre',
    INSTITUCION: 'Universidad Tecnológica',
    SITIO_NOMBRE: 'Portafolio de Evidencias',
    SITIO_DESCRIPCION: 'Portafolio de evidencias académicas',

    // ============================================
    // URLs Y RUTAS - LÓGICA UNIFICADA
    // ============================================
    get BASE_URL() {
        // --- LÓGICA MEJORADA Y MÁS ROBUSTA ---
        // 1. Intentar obtener de una etiqueta <base> (si existe, es lo más fiable)
        const baseTag = document.querySelector('base');
        if (baseTag && baseTag.href) {
            return baseTag.href;
        }

        const fullPath = window.location.pathname;
        const pathParts = fullPath.split('/').filter(part => part.length > 0); // Eliminar partes vacías

        // 2. Detectar si estamos en un entorno de desarrollo local típico
        const isLocalDevelopment = window.location.hostname === 'localhost' || 
                                    window.location.hostname === '127.0.0.1';

        // 3. Construir la URL base.
        //    Se asume que la raíz del proyecto es la carpeta que contiene 'assets', 'unidades', etc.
        //    Si el proyecto está en una subcarpeta del servidor (ej: /portafolio-fw/), el 
        //    último segmento del path antes del archivo actual será el nombre de esa subcarpeta.
        //    Esta lógica es compleja de automatizar al 100%, por lo que se prefiere el uso de <base>
        //    o una variable de entorno en producción. Esta implementación es un buen término medio.
        
        // Solución práctica: Usar el path actual para construir la base.
        // Si el archivo actual está en una subcarpeta (ej: /portafolio-fw/unidades/unidad1.html),
        // la base debería ser hasta /portafolio-fw/.
        let basePath = '/';
        
        // Buscar la carpeta raíz del proyecto (la que contiene 'assets')
        // Esto es una heurística, pero es mejor que usar un string fijo.
        const indexOfAssets = fullPath.indexOf('/assets/');
        if (indexOfAssets !== -1) {
            basePath = fullPath.substring(0, indexOfAssets + 1); // Incluye la última '/'
        } else {
            // Fallback: si no encuentra 'assets', usa la ubicación actual pero asumiendo una estructura.
            // Si estamos en una página dentro de 'unidades', subimos un nivel.
            if (fullPath.includes('/unidades/')) {
                basePath = fullPath.substring(0, fullPath.lastIndexOf('/unidades/') + 1);
            } else {
                // Si no, podría ser la raíz o una carpeta principal. Tomamos hasta el último '/'
                const lastSlashIndex = fullPath.lastIndexOf('/');
                if (lastSlashIndex > 0) {
                    basePath = fullPath.substring(0, lastSlashIndex + 1);
                }
            }
        }
        
        return window.location.origin + basePath;
    },

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
    get INCLUDES_URL() {
        return this.ASSETS_URL + 'includes/'; // Importante para los componentes
    },

    // ============================================
    // FUNCIONES DE AYUDA PARA GENERAR URLs
    // ============================================
    /**
     * Genera una URL absoluta para una ruta específica dentro del proyecto.
     * @param {string} path - Ruta relativa al proyecto (ej. 'unidades/unidad1.html', 'index.html')
     * @returns {string} URL absoluta.
     */
    url(path = '') {
        if (!path) return this.BASE_URL;
        if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
            return path;
        }
        // Limpia el path de posibles './' o '../' al inicio para que no rompa la construcción
        const cleanPath = path.replace(/^(\.\.?\/)+/, '');
        return this.BASE_URL + cleanPath;
    },

    /**
     * Genera una URL para un archivo dentro de la carpeta 'assets'.
     * @param {string} path - Ruta relativa dentro de 'assets' (ej. 'images/logo.png', 'css/main.css')
     * @returns {string} URL absoluta.
     */
    asset(path) {
        return this.ASSETS_URL + path.replace(/^(\.\.?\/)+/, '');
    },

    /**
     * Genera una URL para una imagen dentro de 'assets/images'.
     * @param {string} filename - Nombre del archivo de imagen.
     * @returns {string} URL absoluta.
     */
    image(filename) {
        return this.IMAGES_URL + filename.replace(/^(\.\.?\/)+/, '');
    },

    // ============================================
    // FUNCIONALIDADES ADICIONALES
    // ============================================
    get isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('192.168.');
    },

    get currentPage() {
        return window.location.pathname.split('/').pop() || 'index.html';
    },

    /**
     * Inicializa la configuración y la expone globalmente.
     */
    init() {
        console.log(`🚀 ${this.SITIO_NOMBRE} iniciado`);
        console.log(`📌 Equipo: ${this.ALUMNO1_NOMBRE} & ${this.ALUMNO2_NOMBRE}`);
        console.log(`🌐 URL Base: ${this.BASE_URL}`);
        console.log(`⚙️ Modo: ${this.isDevelopment ? 'Desarrollo' : 'Producción'}`);
        
        // Hacer la configuración globalmente accesible
        window.PortafolioConfig = this;
        return this;
    }
};

// Inicializar inmediatamente para que esté disponible para otros scripts
PortafolioConfig.init();

// Exportar para módulos (útil si usas un bundler)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortafolioConfig;
}
