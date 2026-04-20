/* ============================================================
   EFFECTS.JS — Scroll reveal, ambient effects
   ============================================================ */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        // --- Scroll Reveal ---
        const revealEls = document.querySelectorAll('.reveal');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            });

            revealEls.forEach(el => observer.observe(el));
        } else {
            // Fallback for old browsers
            revealEls.forEach(el => el.classList.add('visible'));
        }

        // --- Stagger children inside reveal parents ---
        document.querySelectorAll('.reveal-stagger').forEach(function (parent) {
            Array.from(parent.children).forEach(function (child, i) {
                child.style.transitionDelay = `${i * 0.1}s`;
                child.classList.add('reveal');
            });
        });

        // Re-observe staggered children
        document.querySelectorAll('.reveal-stagger .reveal').forEach(function (el) {
            if ('IntersectionObserver' in window) {
                // Already handled above if they were in revealEls, but just in case
                el.classList.add('visible');
            }
        });
    });
})();
