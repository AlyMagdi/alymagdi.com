// Latest finding teaser — dynamically update from blog listing
(function() {
    fetch('/blog/')
        .then(function(r) { return r.text(); })
        .then(function(html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            var card = doc.querySelector('.blog-card');
            if (!card) return;
            var href = card.getAttribute('href');
            var title = card.querySelector('h3');
            var excerpt = card.querySelector('p');
            var date = card.querySelector('.blog-date');
            var tag = card.querySelector('.blog-tag');
            var el = document.getElementById('latest-finding-card');
            if (!el || !title) return;
            if (href) el.href = href.replace('../', './');
            document.getElementById('lf-title').textContent = title.textContent;
            if (excerpt) document.getElementById('lf-excerpt').textContent = excerpt.textContent;
            var tagsEl = document.getElementById('lf-tags');
            tagsEl.innerHTML = '';
            if (date) { var d = document.createElement('span'); d.className = 'latest-finding-tag'; d.textContent = date.textContent; tagsEl.appendChild(d); }
            if (tag) { var t = document.createElement('span'); t.className = 'latest-finding-tag'; t.textContent = tag.textContent; tagsEl.appendChild(t); }
        })
        .catch(function() {});
})();

// Terminal typing effect
document.addEventListener('DOMContentLoaded', function () {
    var output = document.getElementById('typed-output');
    var cursor = document.querySelector('.terminal-cursor');
    if (!output) return;

    var text = 'whoami --security-researcher';
    var i = 0;

    function typeChar() {
        if (i < text.length) {
            output.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 60 + Math.random() * 40);
        } else {
            setTimeout(function () {
                cursor.classList.add('done');
            }, 2000);
        }
    }

    setTimeout(typeChar, 500);
});

// Spotlight effect for image
var aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    var spotlight = document.createElement('div');
    spotlight.classList.add('spotlight');
    aboutImage.appendChild(spotlight);

    aboutImage.addEventListener('mousemove', function (e) {
        var rect = aboutImage.getBoundingClientRect();
        spotlight.style.left = (e.clientX - rect.left) + 'px';
        spotlight.style.top = (e.clientY - rect.top) + 'px';
        spotlight.style.opacity = '1';
    });

    aboutImage.addEventListener('mouseleave', function () {
        spotlight.style.opacity = '0';
    });
}
