document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. GESTION DU MENU DROPDOWN MOBILE (EXISTANT)
       ========================================================================== */
    const dropdown = document.getElementById('mobile-dropdown');
    
    if (dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        // Interception de l'événement tactile sur smartphone et tablette
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Annule la redirection immédiate vers services.html
                dropdown.classList.toggle('is-open'); // Alterne l'affichage de la liste
            }
        });

        // Masque automatiquement la liste si l'utilisateur clique ailleurs sur l'écran
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && window.innerWidth <= 768) {
                dropdown.classList.remove('is-open');
            }
        });
    }

    /* ==========================================================================
       2. CONTROLE DU PORTFOLIO EN ACCORDÉON ANIMÉ (NOUVEAU)
       ========================================================================== */
    const accordion = document.getElementById('portfolio-accordion');
    
    if (accordion) {
        const items = accordion.querySelectorAll('.accordion-item');
        let currentIndex = 0;
        let autoPlayTimer = null;
        const intervalTime = 3500; // Temps d'affichage par photo (3,5 secondes)

        // Fonction pour activer une lamelle précise
        function setActiveItem(index) {
            items.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            currentIndex = index;
        }

        // Fonction pour lancer le défilement automatique
        function startAutoPlay() {
            autoPlayTimer = setInterval(() => {
                let nextIndex = (currentIndex + 1) % items.length;
                setActiveItem(nextIndex);
            }, intervalTime);
        }

        // Fonction pour couper le défilement automatique
        function stopAutoPlay() {
            clearInterval(autoPlayTimer);
        }

        // ÉVÉNEMENTS POUR ORDINATEUR (Survol de la souris)
        items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                stopAutoPlay(); // On stoppe le défilement automatique
                setActiveItem(index); // On ouvre la lamelle survolée
            });
        });

        // Relance du défilement quand la souris quitte globalement le portfolio
        accordion.addEventListener('mouseleave', () => {
            startAutoPlay();
        });

        // ÉVÉNEMENTS POUR SMARTPHONE (Touché tactile sur l'iPhone)
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                stopAutoPlay(); // Le clic tactile coupe l'auto-play pour figer le choix de l'utilisateur
                setActiveItem(index);
            });
        });

        // Lancement initial du défilement automatique au chargement
        startAutoPlay();
    }
});
