// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Title cycling functionality
    const siteTitle = document.querySelector('.site-title');
    let isExpanded = true; // Start with expanded title
    
    // Ensure the title starts with the full name
    siteTitle.textContent = 'University of Chicago Geographic Studies Club';
    
    // Set initial transition for hover effects
    siteTitle.style.transition = 'opacity 0.3s ease';
    
    siteTitle.addEventListener('click', function() {
        // Fade out
        this.style.transition = 'opacity 0.2s ease';
        this.style.opacity = '0';
        
        setTimeout(() => {
            // Change text while invisible
            if (isExpanded) {
                this.textContent = 'UCGEO';
                isExpanded = false;
            } else {
                this.textContent = 'University of Chicago Geographic Studies Club';
                isExpanded = true;
            }
            
            // Fade back in
            this.style.opacity = '1';
            
            // Restore hover transition after click animation
            setTimeout(() => {
                this.style.transition = 'opacity 0.3s ease';
            }, 200);
        }, 200);
    });
    
    // Add cursor pointer to indicate clickability
    siteTitle.style.cursor = 'pointer';
    
    // Handle hover effects in JavaScript
    siteTitle.addEventListener('mouseenter', function() {
        if (this.style.opacity !== '0') { // Don't interfere during click animation
            this.style.opacity = '0.6';
        }
    });
    
    siteTitle.addEventListener('mouseleave', function() {
        if (this.style.opacity !== '0') { // Don't interfere during click animation
            this.style.opacity = '1';
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 20;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active state to navigation items on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // No scroll effect needed for sidebar navigation
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
    
    // Don't animate hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Carousel functionality
let slideIndex = 1;

function slideCount() {
    return document.querySelectorAll('.carousel-slide').length;
}

function nextSlide() {
    slideIndex++;
    if (slideIndex > slideCount()) { slideIndex = 1; }
    showSlide(slideIndex);
}

function previousSlide() {
    slideIndex--;
    if (slideIndex < 1) { slideIndex = slideCount(); }
    showSlide(slideIndex);
}

// One dot per slide, so adding a poster only needs a new .carousel-slide
document.addEventListener('DOMContentLoaded', function() {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer || dotsContainer.children.length) return;
    for (let i = 1; i <= slideCount(); i++) {
        const dot = document.createElement('span');
        dot.className = i === 1 ? 'dot active' : 'dot';
        dot.addEventListener('click', () => currentSlide(i));
        dotsContainer.appendChild(dot);
    }
});

function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
}

function showSlide(n) {
    const carousel = document.querySelector('.carousel');
    const dots = document.querySelectorAll('.dot');
    
    if (carousel) {
        const slideWidth = 100;
        carousel.style.transform = `translateX(-${(n - 1) * slideWidth}%)`;
    }
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[n - 1]) {
        dots[n - 1].classList.add('active');
    }
}

// Keyboard navigation for carousel (Left/Right arrows)
document.addEventListener('keydown', function(e) {
    const isCarouselInView = (() => {
        const el = document.querySelector('.carousel-container');
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    })();
    if (!isCarouselInView || document.querySelector('.lightbox[open]')) return;
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Touch/Swipe functionality for carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isScrolling = null;
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = null;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchmove', function(e) {
            // Only handle horizontal swipes, allow vertical scrolling
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            if (isScrolling === null) {
                isScrolling = Math.abs(currentX - startX) < Math.abs(currentY - startY);
            }
            
            // If it's a horizontal swipe, prevent default
            if (!isScrolling) {
                e.preventDefault();
            }
        }, { passive: false });
        
        carouselContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            // Only handle horizontal swipes
            if (!isScrolling) {
                handleSwipe();
            }
        }, { passive: true });
    }
    
    function handleSwipe() {
        const threshold = 25; // Minimum distance for a swipe (reduced for better sensitivity)
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Check if it's a horizontal swipe with sufficient distance
        if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                // Swipe right - go to previous slide
                previousSlide();
            } else {
                // Swipe left - go to next slide
                nextSlide();
            }
        }
    }
});

// Auto-advance carousel disabled
// document.addEventListener('DOMContentLoaded', function() {
//     setInterval(nextSlide, 5000);
// });

// Mobile single-tap functionality for community partner links
document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Handle single-tap for partner links on mobile
    const partnerLinks = document.querySelectorAll('.partner-link');
    
    partnerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (isMobile()) {
                // On mobile, directly open the link (no double-tap needed)
                window.open(this.href, '_blank');
                e.preventDefault();
            }
        });
    });
});

// ---------- Geo theme ----------

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Count the consulate stamps so the totals never go stale
document.addEventListener('DOMContentLoaded', function() {
    const total = document.querySelectorAll('.consulate-item').length;
    document.querySelectorAll('[data-consulate-count]').forEach(el => {
        el.textContent = total;
    });
});

// Hero coordinates "acquire a GPS fix" on load
document.addEventListener('DOMContentLoaded', function() {
    const el = document.querySelector('.coords-value');
    if (!el || prefersReducedMotion) return;

    const lat = parseFloat(el.dataset.lat);
    const lon = parseFloat(el.dataset.lon);
    const ns = lat >= 0 ? 'N' : 'S';
    const ew = lon >= 0 ? 'E' : 'W';
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.abs(lat * eased).toFixed(4)}° ${ns}, ${Math.abs(lon * eased).toFixed(4)}° ${ew}`;
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
});

// Compass needle swings gently as the page scrolls
document.addEventListener('DOMContentLoaded', function() {
    const needle = document.querySelector('.compass-needle');
    if (!needle || prefersReducedMotion) return;

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            needle.style.transform = `rotate(${Math.sin(window.scrollY / 180) * 24}deg)`;
            ticking = false;
        });
    }, { passive: true });
});

// World map of visited consulates. Countries are highlighted from the data-iso
// attributes on the .consulate-item stamps, so the stamps are the only list to edit.
document.addEventListener('DOMContentLoaded', function() {
    const figure = document.getElementById('consulate-map');
    const world = window.UCGEO_WORLD;
    if (!figure || !world) return;

    const SVG_NS = 'http://www.w3.org/2000/svg';
    function make(tag, attrs, parent) {
        const el = document.createElementNS(SVG_NS, tag);
        Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
        parent.appendChild(el);
        return el;
    }

    const stamps = {};
    document.querySelectorAll('.consulate-item[data-iso]').forEach(item => {
        stamps[item.dataset.iso.toUpperCase()] = item;
    });

    const svg = make('svg', { viewBox: `0 0 ${world.w} ${world.h}`, role: 'img' }, figure);
    make('title', {}, svg).textContent = 'Countries whose Chicago consulates UCGEO has visited';
    make('path', { d: world.sphere, class: 'map-sphere' }, svg);
    make('path', { d: world.graticule, class: 'map-graticule' }, svg);
    const landLayer = make('g', {}, svg);
    const routeLayer = make('g', {}, svg);
    const markerLayer = make('g', {}, svg);

    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    figure.appendChild(tooltip);

    const legend = document.createElement('figcaption');
    legend.className = 'map-legend';
    legend.innerHTML =
        '<span><i class="legend-home"></i>Chicago</span>' +
        '<span><i class="legend-visited"></i>Consulate visited</span>' +
        '<span><i class="legend-route"></i>Route from Chicago</span>';
    figure.appendChild(legend);

    const countryPaths = {};
    const routePaths = {};
    Object.keys(world.countries).forEach(iso => {
        const visited = iso in stamps;
        countryPaths[iso] = make('path', {
            d: world.countries[iso].d,
            class: visited ? 'map-land visited' : 'map-land'
        }, landLayer);
    });

    // Routes bow toward the pole, like a great-circle flight path
    const [hx, hy] = world.chicago;
    Object.keys(stamps).forEach((iso, i) => {
        const country = world.countries[iso];
        if (!country) return; // very small countries aren't in the 1:110m data
        const [x, y] = country.c;
        const dx = x - hx;
        const dy = y - hy;
        const dist = Math.hypot(dx, dy);
        let nx = -dy / dist;
        let ny = dx / dist;
        if (ny > 0) { nx = -nx; ny = -ny; }
        const bend = dist * 0.22;
        const cx = (hx + x) / 2 + nx * bend;
        const cy = (hy + y) / 2 + ny * bend;

        const route = make('path', { d: `M${hx},${hy} Q${cx},${cy} ${x},${y}`, class: 'map-route' }, routeLayer);
        route.style.setProperty('--route-length', route.getTotalLength());
        route.style.setProperty('--route-delay', `${i * 0.08}s`);
        routePaths[iso] = route;
        make('circle', { cx: x, cy: y, r: 2.5, class: 'map-dest' }, markerLayer);
    });

    make('circle', { cx: hx, cy: hy, r: 4.5, class: 'map-home-pulse' }, markerLayer);
    make('circle', { cx: hx, cy: hy, r: 4.5, class: 'map-home' }, markerLayer);
    make('text', { x: hx - 10, y: hy + 4, 'text-anchor': 'end', class: 'map-home-label' }, markerLayer).textContent = 'CHICAGO';

    function label(iso) {
        const stamp = stamps[iso];
        return `${stamp.querySelector('.flag').textContent} ${stamp.querySelector('.country').textContent}`;
    }

    function showTooltip(iso, left, top) {
        tooltip.textContent = label(iso);
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.classList.add('is-visible');
    }

    function setHighlight(iso, on) {
        [countryPaths[iso], routePaths[iso], stamps[iso]].forEach(el => {
            if (el) el.classList.toggle('is-highlighted', on);
        });
        if (!on) tooltip.classList.remove('is-visible');
    }

    Object.keys(stamps).forEach(iso => {
        const path = countryPaths[iso];
        if (!path) return;

        path.addEventListener('mousemove', function(e) {
            const box = figure.getBoundingClientRect();
            showTooltip(iso, e.clientX - box.left, e.clientY - box.top);
        });
        path.addEventListener('mouseenter', () => setHighlight(iso, true));
        path.addEventListener('mouseleave', () => setHighlight(iso, false));
        path.addEventListener('click', () => window.open(stamps[iso].href, '_blank'));

        // Hovering a stamp lights up its country and route on the map
        stamps[iso].addEventListener('mouseenter', function() {
            setHighlight(iso, true);
            const svgBox = svg.getBoundingClientRect();
            const box = figure.getBoundingClientRect();
            const scale = svgBox.width / world.w;
            const [x, y] = world.countries[iso].c;
            showTooltip(iso, svgBox.left - box.left + x * scale, svgBox.top - box.top + y * scale);
        });
        stamps[iso].addEventListener('mouseleave', () => setHighlight(iso, false));
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;
    figure.classList.add('is-animated');
    const mapObserver = new IntersectionObserver(function(entries) {
        if (entries.some(entry => entry.isIntersecting)) {
            figure.classList.add('is-drawn');
            mapObserver.disconnect();
        }
    }, { threshold: 0.35 });
    mapObserver.observe(figure);
});

// Field photo lightbox
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox || typeof lightbox.showModal !== 'function') return;

    const image = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox-caption');
    let enlarge = false;

    // Photos whose link has data-enlarge are scaled up to fill the viewer like the larger photos
    function sizeImage() {
        image.style.width = '';
        if (!enlarge || !image.naturalWidth) return;
        const frame = 16; // the 8px white border on each side
        const scale = Math.min(
            (window.innerWidth * 0.92 - frame) / image.naturalWidth,
            (window.innerHeight * 0.84 - frame) / image.naturalHeight
        );
        if (scale > 1) image.style.width = `${Math.floor(image.naturalWidth * scale) + frame}px`;
    }
    image.addEventListener('load', sizeImage);

    document.querySelectorAll('.field-photo a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const figcaption = this.closest('.field-photo').querySelector('figcaption');
            enlarge = this.hasAttribute('data-enlarge');
            image.style.width = '';
            image.src = this.href;
            if (image.complete) sizeImage();
            image.alt = this.querySelector('img').alt;
            caption.textContent = Array.from(figcaption.childNodes)
                .map(node => node.textContent.trim())
                .filter(Boolean)
                .join(' ');
            lightbox.showModal();
        });
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.close();
        }
    });
});
