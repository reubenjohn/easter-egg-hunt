/**
 * Shared site navigation bar.
 * Auto-injects a nav bar at the top of <body> on every page that includes this script.
 * Hidden automatically when printing (via inline style + media query).
 */
(function () {
    var pages = [
        { href: 'index.html', label: 'Invitation' },
        { href: 'prep.html', label: 'Prep' },
        { href: 'tasks-print.html', label: 'Print Cards' },
        { href: 'scoring.html', label: 'Scoring' }
    ];

    // Determine current page from pathname
    var path = window.location.pathname;
    var currentFile = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // Build nav element
    var nav = document.createElement('nav');
    nav.className = 'site-nav';

    pages.forEach(function (p) {
        var a = document.createElement('a');
        a.href = p.href;
        a.textContent = p.label;
        if (p.href === currentFile) a.className = 'active';
        nav.appendChild(a);
    });

    // Inject at very top of body
    document.body.insertBefore(nav, document.body.firstChild);

    // Inject styles once
    var style = document.createElement('style');
    style.textContent =
        '.site-nav{display:flex;justify-content:center;gap:.25rem;background:#5d4037;padding:.6rem 1rem;flex-wrap:wrap;position:sticky;top:0;z-index:200}' +
        '.site-nav a{color:rgba(255,255,255,.8);text-decoration:none;font-weight:700;font-size:.85rem;padding:.35rem 1rem;border-radius:2rem;transition:all .2s ease}' +
        '.site-nav a:hover{background:rgba(255,255,255,.15);color:#fff}' +
        '.site-nav a.active{background:rgba(255,255,255,.2);color:#fff}' +
        '@media print{.site-nav{display:none!important}}';
    document.head.appendChild(style);
})();
