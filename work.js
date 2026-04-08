// Animated stat counters
document.addEventListener('DOMContentLoaded', function () {
    var counters = document.querySelectorAll('.stat-number[data-count]');
    var animated = false;

    function animateCounters() {
        if (animated) return;
        counters.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-count'));
            var suffix = el.getAttribute('data-suffix') || '';
            var duration = 1500;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(eased * target);
                el.textContent = current + suffix;
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target + suffix;
                }
            }

            requestAnimationFrame(step);
        });
        animated = true;
    }

    var statsRow = document.querySelector('.stats-row');
    if (statsRow && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(statsRow);
    } else {
        animateCounters();
    }
});
