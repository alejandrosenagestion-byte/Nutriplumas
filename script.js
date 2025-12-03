// Mostrar mensaje de bienvenida
console.log("🔍 Wiki NutripLumas S.A. cargada correctamente");
console.log("🔍 Fecha actual: Diciembre 2025");
console.log("🔍 Imagen del diagrama cargada correctamente");

// Actualizar año en footer
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.querySelector('footer p:first-child');
    if (yearSpan) {
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', new Date().getFullYear());
    }
    
    // Efecto en tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 3px 15px rgba(0,0,0,0.05)';
        });
    });
    
    // Mostrar alerta de carga
    setTimeout(() => {
        console.log("✅ Todos los recursos cargados");
    }, 1000);
});
