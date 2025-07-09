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
    if (slideIndex > 12) { slideIndex = 1; }
    showSlide(slideIndex);
}

function previousSlide() {
    slideIndex--;
    if (slideIndex < 1) { slideIndex = 12; }
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

// Auto-advance carousel disabled
// document.addEventListener('DOMContentLoaded', function() {
//     setInterval(nextSlide, 5000);
// }); 