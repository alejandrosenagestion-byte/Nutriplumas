// ============================================
// WIKI NUTRIPLUMAS S.A. - SCRIPT PRINCIPAL
// ============================================

// Mostrar mensaje de bienvenida en consola
console.log("📊 =========================================");
console.log("📊 WIKI NUTRIPLUMAS S.A.");
console.log("📊 Área de Finanzas y Abastecimiento");
console.log("📊 =========================================");
console.log("📊 Cargada correctamente: " + new Date().toLocaleString());
console.log("📊 Contacto: alejandrosenagestion@gmail.com");
console.log("📊 Diagramas: diagrama.jpeg + diagrama tesoreria.jpg");
console.log("📊 =========================================");

// Función principal cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM completamente cargado");
    
    // ====================
    // 1. CONTROL DE IMÁGENES DE DIAGRAMAS
    // ====================
    function setupDiagramImages() {
        const diagrams = document.querySelectorAll('.diagram');
        console.log("🖼️ Configurando " + diagrams.length + " diagramas");
        
        diagrams.forEach((img, index) => {
            // Agregar clase de carga
            img.classList.add('loading');
            
            // Configurar eventos de carga/error
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
                console.log("✅ Diagrama " + (index + 1) + " cargado: " + this.alt);
            });
            
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                console.warn("⚠️ Error cargando diagrama " + (index + 1) + ": " + this.src);
                
                // Mostrar mensaje de error
                const container = this.closest('.image-container');
                if (container) {
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'image-error';
                    errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Diagrama no disponible temporalmente';
                    errorMsg.style.color = '#dc3545';
                    errorMsg.style.marginTop = '10px';
                    container.appendChild(errorMsg);
                }
            });
            
            // Forzar carga si es necesario
            if (img.complete) {
                img.dispatchEvent(new Event('load'));
            }
        });
    }
    
    // ====================
    // 2. CONTROL DEL BOTÓN "VOLVER ARRIBA" (FIXED)
    // ====================
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Configurar el botón
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log("⬆️ Scroll al inicio (botón flotante)");
        });
        
        // Mostrar/ocultar según scroll
        window.addEventListener('scroll', toggleBackToTopButton);
        toggleBackToTopButton(); // Estado inicial
    }
    
    // ====================
    // 3. ACTUALIZAR AÑO EN FOOTER
    // ====================
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('footer p');
    
    yearElements.forEach(element => {
        if (element.textContent.includes('2025')) {
            element.innerHTML = element.innerHTML.replace('2025', currentYear);
        }
    });
    
    console.log("✅ Año actualizado: " + currentYear);
    
    // ====================
    // 4. NAVEGACIÓN ACTIVA
    // ====================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Función para actualizar navegación activa
    function updateActiveNav() {
        let currentSection = '';
        
        // Encontrar sección visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Actualizar links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').replace('#', '');
            
            if (linkHref === currentSection) {
                link.classList.add('active');
            }
        });
        
        // Si estamos en top, activar introducción
        if (window.scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#introduccion') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Escuchar clics en navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Actualizar estado activo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                console.log("📍 Navegando a: " + targetId);
            }
        });
    });
    
    // ====================
    // 5. CONFIGURAR TODOS LOS BOTONES "VOLVER ARRIBA"
    // ====================
    const allTopButtons = document.querySelectorAll('[onclick*="scrollToTop"], .back-top-btn, .top-btn, .footer-top-btn');
    
    allTopButtons.forEach(button => {
        // Remover el onclick inline si existe
        if (button.hasAttribute('onclick')) {
            const onclickAttr = button.getAttribute('onclick');
            if (onclickAttr.includes('scrollToTop')) {
                button.removeAttribute('onclick');
                
                // Agregar evento limpio
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    console.log("⬆️ Scroll al inicio desde: " + this.className);
                });
            }
        }
    });
    
    // También configurar los botones de sección
    const sectionTopButtons = document.querySelectorAll('.section-top-btn');
    sectionTopButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log("⬆️ Scroll al inicio (botón de sección)");
        });
    });
    
    console.log("✅ " + allTopButtons.length + " botones 'Volver Arriba' configurados");
    
    // ====================
    // 6. EFECTOS HOVER EN TARJETAS
    // ====================
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
        });
    });
    
    console.log("✅ Efectos hover configurados en " + cards.length + " tarjetas");
    
    // ====================
    // 7. EFECTOS EN DIAGRAMAS
    // ====================
    const diagramSections = document.querySelectorAll('.diagram-section');
    
    diagramSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // ====================
    // 8. ANIMACIÓN DE CARGA
    // ====================
    setTimeout(() => {
        document.body.style.opacity = '1';
        console.log("✅ Animación de carga completada");
    }, 300);
    
    // ====================
    // 9. SCROLL SUAVE GENERAL
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ====================
    // 10. ESCUCHAR SCROLL PARA NAVEGACIÓN Y BOTÓN
    // ====================
    window.addEventListener('scroll', function() {
        updateActiveNav();
        toggleBackToTopButton();
    });
    
    // ====================
    // 11. BOTÓN DE CONTACTO MEJORADO
    // ====================
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            if (!this.getAttribute('href')) {
                e.preventDefault();
                console.log("📧 Preparando correo de contacto...");
                
                // Aquí podrías agregar un modal o confirmación
                alert("Se abrirá tu cliente de correo para contactar a: alejandrosenagestion@gmail.com");
            }
        });
    }
    
    // ====================
    // 12. INICIALIZAR DIAGRAMAS
    // ====================
    setupDiagramImages();
    
    // ====================
    // 13. INICIALIZACIÓN COMPLETA
    // ====================
    setTimeout(() => {
        updateActiveNav(); // Actualizar navegación inicial
        
        console.log("🎉 Wiki completamente inicializada");
        console.log("🔗 Secciones detectadas: " + sections.length);
        console.log("🖼️ Diagramas configurados: " + document.querySelectorAll('.diagram').length);
        console.log("💼 Tarjetas de roles: " + document.querySelectorAll('.role-card').length);
        
        // Mostrar mensaje de bienvenida sutil
        if (!sessionStorage.getItem('wikiWelcomeShown')) {
            console.log("👋 ¡Bienvenido a la Wiki de Nutriplumas!");
            sessionStorage.setItem('wikiWelcomeShown', 'true');
        }
    }, 500);
    
    // ====================
    // 14. RESPONSIVE CHECK
    // ====================
    function checkResponsive() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            document.body.classList.add('mobile-view');
            console.log("📱 Vista móvil detectada");
        } else {
            document.body.classList.remove('mobile-view');
        }
    }
    
    window.addEventListener('resize', checkResponsive);
    checkResponsive(); // Ejecutar al cargar
});

// ============================================
// FUNCIONES UTILITARIAS ADICIONALES
// ============================================

// Función para copiar email al portapapeles
function copyEmailToClipboard() {
    const email = 'alejandrosenagestion@gmail.com';
    
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copiado al portapapeles: ' + email);
    }).catch(err => {
        console.error('Error al copiar email: ', err);
    });
}

// Función para imprimir la wiki
function printWiki() {
    window.print();
}

// Función para modo oscuro (opcional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    console.log("🌙 Modo oscuro: " + document.body.classList.contains('dark-mode'));
}

// Función global para scroll suave al top (definida también en HTML)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    console.log("⬆️ Scroll al inicio (función global)");
}

// ============================================
// EXPORTAR FUNCIONES PARA CONSOLA (DEBUG)
// ============================================
window.wikiUtils = {
    copyEmail: copyEmailToClipboard,
    print: printWiki,
    darkMode: toggleDarkMode,
    scrollToTop: scrollToTop,
    version: '1.2.0',
    author: 'Nutriplumas S.A.',
    features: ['navegación', 'scroll-smooth', 'botones-volver', 'diagramas', 'responsive']
};

console.log("🔧 Utilidades disponibles: window.wikiUtils"););
});
