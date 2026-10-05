/**
 * @filesource       /assets/js/accordion.js
 * @description      Gestion dynamique multi-accordéons responsive (Mobile-first)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne tous les blocs d'accordéons de la page
    const accordions = document.querySelectorAll('.js-accordion');
    
    if (accordions.length === 0) return;

    accordions.forEach((accordion) => {
        const items = accordion.querySelectorAll('.accordion-item');
        if (items.length === 0) return;

        let currentIndex = 0;
        let autoPlayInterval;

        // Fonction pour changer le volet actif
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

        // Cycle de rotation automatique (4 secondes)
        function startCycle() {
            autoPlayInterval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % items.length;
                activateItem(nextIndex);
            }, 4000);
        }

        function stopCycle() {
            clearInterval(autoPlayInterval);
        }

        // Événements pour ordinateur (survol) et mobile (tactile)
        items.forEach((item, index) => {
            const handleInteraction = () => {
                stopCycle();
                activateItem(index);
            };

            item.addEventListener('mouseenter', handleInteraction);
            item.addEventListener('touchstart', handleInteraction, { passive: true });

            item.addEventListener('mouseleave', () => {
                startCycle();
            });
        });

        // Lancement initial de l'accordéon individuel
        startCycle();
    });
});
