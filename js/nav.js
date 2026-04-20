/* ============================================================
   NAV.JS — Mobile menu & scroll-active nav links
   ============================================================ */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks   = document.querySelector('.nav-links');
        const links      = document.querySelectorAll('.nav-links a[href^="#"]');
        const sections   = document.querySelectorAll('section[id]');

        // --- Mobile menu toggle ---
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function () {
                const isOpen = navLinks.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', isOpen);
            });

            // Close on link click
            links.forEach(link => {
                link.addEventListener('click', function () {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Close on outside click
            document.addEventListener('click', function (e) {
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // --- Active nav link on scroll ---
        const NAV_OFFSET = 100;

        function setActiveLink() {
            const scrollY = window.scrollY + NAV_OFFSET;

            sections.forEach(function (section) {
                const top    = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id     = section.getAttribute('id');
                const link   = document.querySelector(`.nav-links a[href="#${id}"]`);

                if (!link) return;

                if (scrollY >= top && scrollY < bottom) {
                    links.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', setActiveLink, { passive: true });
        setActiveLink();

        // --- Header shadow on scroll ---
        const header = document.querySelector('header');
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                header.style.borderBottomColor = 'rgba(245, 166, 35, 0.2)';
            } else {
                header.style.borderBottomColor = '';
            }
        }, { passive: true });
    });
})();
