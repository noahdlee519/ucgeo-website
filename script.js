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

function nextSlide() {
    slideIndex++;
    if (slideIndex > 11) { slideIndex = 1; }
    showSlide(slideIndex);
}

function previousSlide() {
    slideIndex--;
    if (slideIndex < 1) { slideIndex = 11; }
    showSlide(slideIndex);
}

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
    if (!isCarouselInView) return;
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