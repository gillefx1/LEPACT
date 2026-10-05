/**
 * @filesource       /assets/js/accordion.js
 * @description      Gestion dynamique multi-accordéons avec défilement automatique (Effet CYOS)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Détecte l'accordéon de la page d'accueil (#portfolio-accordion) et ceux de la page galerie (.js-accordion)
    const accordions = document.querySelectorAll('#portfolio-accordion, .js-accordion');
    
    if (accordions.length === 0) return;

    accordions.forEach((accordion) => {
        const items = accordion.querySelectorAll('.accordion-item');
        if (items.length === 0) return;

        let currentIndex = 0;
        let autoPlayInterval;

        // Fonction pour activer un volet et déclencher le zoom CSS
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

        // Cycle de rotation automatique (toutes les 4 secondes)
        function startCycle() {
            autoPlayInterval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % items.length;
                activateItem(nextIndex);
            }, 4000);
        }

        function stopCycle() {
            clearInterval(autoPlayInterval);
        }

        // Interactions humaines (Souris sur PC, Tactile sur smartphone/tablette)
        items.forEach((item, index) => {
            const handleInteraction = () => {
                stopCycle(); // On coupe le défilement automatique si l'utilisateur interagit
                activateItem(index);
            };

            item.addEventListener('mouseenter', handleInteraction);
            item.addEventListener('touchstart', handleInteraction, { passive: true });

            item.addEventListener('mouseleave', () => {
                startCycle(); // On relance le défilement automatique quand la souris s'en va
            });
        });

        // Lancement initial de la rotation sur cet accordéon
        startCycle();
    });
});
