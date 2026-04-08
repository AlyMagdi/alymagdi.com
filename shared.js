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

    // --- Email Assembly (anti-harvesting) ---
    var _eu = 'naar0ony', _ed = 'gmail.com', _em = _eu + '@' + _ed;
    var emailLinks = document.querySelectorAll('a[data-email]');
    emailLinks.forEach(function (el) { el.href = 'mailto:' + _em; });

    // --- Email Button Clipboard ---
    var emailButton = document.querySelector('.email-button');
    if (emailButton) {
        var emailOriginalNodes = Array.prototype.slice.call(emailButton.childNodes).map(function (n) { return n.cloneNode(true); });
        emailButton.addEventListener('click', function () {
            navigator.clipboard.writeText(_em).then(function () {
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

    // --- Mobile Bottom Tab Bar ---
    var bottomNav = document.createElement('nav');
    bottomNav.className = 'bottom-tab-bar';
    bottomNav.innerHTML =
        '<a href="/" class="tab-item" data-tab="">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
            '<span>Home</span>' +
        '</a>' +
        '<a href="/about/" class="tab-item" data-tab="about">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
            '<span>About</span>' +
        '</a>' +
        '<a href="/blog/" class="tab-item" data-tab="blog">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' +
            '<span>Blog</span>' +
        '</a>' +
        '<a href="/work/" class="tab-item" data-tab="work">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' +
            '<span>Work</span>' +
        '</a>' +
        '<button class="tab-item tab-theme" aria-label="Toggle theme">' +
            '<svg class="tab-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' +
            '<svg class="tab-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
            '<span>Theme</span>' +
        '</button>';
    document.body.appendChild(bottomNav);

    // Bottom bar theme toggle
    var tabTheme = bottomNav.querySelector('.tab-theme');
    if (tabTheme) {
        tabTheme.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var next = (current === 'light') ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            var meta = document.querySelector('meta[name="theme-color"]');
            if (meta) {
                meta.setAttribute('content', next === 'light' ? '#fafafa' : '#0f0f0f');
            }
        });
    }

    // Highlight active tab
    var currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    var currentTab = currentPath.split('/').filter(Boolean);
    var activeTab = currentTab.length > 0 ? currentTab[0] : '';
    var tabItems = bottomNav.querySelectorAll('.tab-item[data-tab]');
    tabItems.forEach(function (tab) {
        if (tab.getAttribute('data-tab') === activeTab) {
            tab.classList.add('active');
        }
    });

});
