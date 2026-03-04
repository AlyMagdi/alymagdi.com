/* ===========================
   SHARED JS — alymagdi.com
   =========================== */

// --- Theme Toggle ---
(function () {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
        document.documentElement.setAttribute('data-theme', saved);
    }
})();

// --- Frame-Busting (Anti-Clickjacking) ---
if (window.top !== window.self) {
    window.top.location = window.self.location;
}

document.addEventListener('DOMContentLoaded', function () {

    // --- Theme Toggle Button ---
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            // Default (no attribute) is dark, so toggle to light; if light, toggle back
            var next = (current === 'light') ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);

            // Update theme-color meta
            var meta = document.querySelector('meta[name="theme-color"]');
            if (meta) {
                meta.setAttribute('content', next === 'light' ? '#fafafa' : '#0f0f0f');
            }
        });
    }

    // --- Email Button Clipboard ---
    var emailButton = document.querySelector('.email-button');
    if (emailButton) {
        var emailOriginalNodes = Array.prototype.slice.call(emailButton.childNodes).map(function (n) { return n.cloneNode(true); });
        emailButton.addEventListener('click', function () {
            navigator.clipboard.writeText('naar0ony@gmail.com').then(function () {
                emailButton.textContent = 'Copied!';
                setTimeout(function () {
                    emailButton.textContent = '';
                    emailOriginalNodes.forEach(function (n) { emailButton.appendChild(n.cloneNode(true)); });
                }, 2000);
            });
        });
    }

    // --- Scroll-Based Section Reveal ---
    var sections = document.querySelectorAll('.section');

    function checkVisibility() {
        sections.forEach(function (section) {
            var rect = section.getBoundingClientRect();
            var isVisible = rect.top <= (window.innerHeight - 100);
            if (isVisible) {
                section.classList.add('visible');
            }
        });
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);

    // --- Active Nav Link Highlighter ---
    var path = window.location.pathname.replace(/\/index\.html$/, '/');
    var pathParts = path.split('/').filter(Boolean);
    var currentFolder = pathParts.length > 0 ? pathParts[pathParts.length - 1] : '';
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        var linkFolder = href.replace(/^\.\.?\//, '').replace(/\/$/, '');
        if (linkFolder === currentFolder ||
            (currentFolder === '' && (linkFolder === '' || linkFolder === 'index.html'))) {
            link.classList.add('active');
        }
    });

    // --- Mobile Hamburger Menu ---
    var menuToggle = document.querySelector('.menu-toggle');
    var navItems = document.querySelector('.nav-items');

    if (menuToggle && navItems) {
        function updateMobileState() {
            if (window.innerWidth <= 809) {
                navItems.classList.add('js-ready');
            } else {
                navItems.classList.remove('js-ready', 'nav-open');
                menuToggle.classList.remove('active');
            }
        }

        updateMobileState();
        window.addEventListener('resize', updateMobileState);

        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navItems.classList.toggle('nav-open');
            menuToggle.classList.toggle('active');
        });

        // Close on nav link click
        navItems.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navItems.classList.remove('nav-open');
                menuToggle.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!navItems.contains(e.target) && !menuToggle.contains(e.target)) {
                navItems.classList.remove('nav-open');
                menuToggle.classList.remove('active');
            }
        });
    }

    // --- Scroll-to-Top Button ---
    var scrollBtn = document.querySelector('.scroll-top');
    if (scrollBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });

        scrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Footer Year ---
    var fy = document.getElementById('footer-year');
    if (fy) fy.textContent = new Date().getFullYear();

});
