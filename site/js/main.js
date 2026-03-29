// ── Floating Background Eggs ────────────────
(function createFloatingEggs() {
    var container = document.getElementById('floatingEggs');
    var eggEmojis = ['🥚', '🐣', '🐰', '🌸', '🌷', '🪺'];
    var colors = ['#fce4ec', '#e8d5f5', '#e8f5e9', '#e3f2fd', '#fff9c4'];

    for (var i = 0; i < 20; i++) {
        var egg = document.createElement('span');
        egg.className = 'floating-egg';
        egg.textContent = eggEmojis[Math.floor(Math.random() * eggEmojis.length)];
        egg.style.left = Math.random() * 100 + '%';
        egg.style.animationDuration = (15 + Math.random() * 25) + 's';
        egg.style.animationDelay = -(Math.random() * 30) + 's';
        egg.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
        container.appendChild(egg);
    }
})();

// ── Mobile Nav Toggle ───────────────────────
(function setupNav() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');

    toggle.addEventListener('click', function () {
        links.classList.toggle('open');
    });

    // Close nav when a link is clicked
    var navAnchors = links.querySelectorAll('a');
    for (var i = 0; i < navAnchors.length; i++) {
        navAnchors[i].addEventListener('click', function () {
            links.classList.remove('open');
        });
    }
})();

// ── Scroll Reveal ───────────────────────────
// Re-queries .reveal elements each time so dynamically added content works
(function setupReveal() {
    function checkReveal() {
        var reveals = document.querySelectorAll('.reveal:not(.visible)');
        var windowHeight = window.innerHeight;
        for (var i = 0; i < reveals.length; i++) {
            var top = reveals[i].getBoundingClientRect().top;
            var revealPoint = 120;
            if (top < windowHeight - revealPoint) {
                reveals[i].classList.add('visible');
            }
        }
    }

    window.addEventListener('scroll', checkReveal, { passive: true });
    // Initial check + periodic recheck for dynamically loaded content
    checkReveal();
    // Re-check after config may have loaded
    setTimeout(checkReveal, 100);
    setTimeout(checkReveal, 500);
})();

// ── Navbar hide/show on scroll ──────────────
(function setupNavbarScroll() {
    var navbar = document.getElementById('navbar');
    var lastScrollY = window.scrollY;
    var ticking = false;

    function updateNav() {
        var currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });
})();

// ── Active nav link highlight ───────────────
(function setupActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');

    function updateActive() {
        var scrollPos = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.style.background = '';
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.background = 'var(--pink)';
                        link.style.color = 'var(--brown)';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
})();
