/**
 * Shared config loader for the Easter Egg Hunt site.
 *
 * Fetches data/config.json and exposes it as window.CONFIG.
 * Pages call CONFIG.ready(callback) to run code after config loads.
 */
(function () {
    var CONFIG = {
        data: null,
        _callbacks: [],
        ready: function (fn) {
            if (CONFIG.data) {
                fn(CONFIG.data);
            } else {
                CONFIG._callbacks.push(fn);
            }
        }
    };

    // Determine base path relative to the HTML file
    var scripts = document.getElementsByTagName('script');
    var configScript = null;
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.indexOf('config.js') !== -1) {
            configScript = scripts[i];
            break;
        }
    }
    var basePath = '';
    if (configScript) {
        var src = configScript.getAttribute('src');
        // src is like "js/config.js", base is everything before "js/"
        var idx = src.indexOf('js/config.js');
        if (idx > 0) basePath = src.substring(0, idx);
    }

    var url = basePath + 'data/config.json';
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
            CONFIG.data = data;
            CONFIG._callbacks.forEach(function (fn) { fn(data); });
            CONFIG._callbacks = [];
        })
        .catch(function (err) {
            console.error('Failed to load config:', err);
        });

    window.CONFIG = CONFIG;
})();
