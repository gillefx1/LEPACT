/**
 * @filesource       /assets/js/accordion.js
 * @description      Gestion de l'animation automatique et interactive de l'accordéon
 */

document.addEventListener('DOMContentLoaded', function() {
    const accordion = document.getElementById('portfolio-accordion');
    
    // Sécurité au cas où l'accordéon n'est pas présent sur la page
    if (!accordion) return;

    const items = accordion.querySelectorAll('.accordion-item');
    let currentIndex = 0;
    let autoPlayInterval;

    // Fonction pour activer un volet spécifique
    function activateItem(index) {
        items.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        currentIndex = index;
    }

    // Démarrage du défilement automatique (toutes les 4 secondes)
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % items.length;
            activateItem(nextIndex);
        }, 4000);
    }

    // Arrêt du défilement automatique
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Gestion des interactions au survol
    items.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            stopAutoPlay();
            activateItem(index);
        });

        item.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    });

    // Initialisation du cycle automatique au chargement
    startAutoPlay();
});
