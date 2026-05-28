// ==========================================
// Mobile Toggle
// ==========================================
const toggle = document.querySelector('.mobile-toggle');
const navbar = document.querySelector('.navbar');

if (toggle) {
    toggle.addEventListener('click', () => {
        navbar.classList.toggle('show');
    });
}

// ==========================================
// Active Menu Highlight
// ==========================================
function updateActiveMenu() {
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPath = window.location.pathname.split('/').pop();
    const currentHash = window.location.hash;

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove active class from all
        link.classList.remove('active');

        if (currentPath === 'contact.html' && linkPath === 'contact.html') {
            link.classList.add('active');
        } else if (currentPath === 'about.html' && linkPath === 'about.html') {
            link.classList.add('active');
        } else if (currentPath === 'services.html' && linkPath === 'services.html') {
            link.classList.add('active');
        } else if (currentPath === 'projects.html' && linkPath === 'projects.html') {
            link.classList.add('active');
        } else if ((currentPath === '' || currentPath === 'index.html') && linkPath.startsWith('index.html')) {
            // For index.html sections
            if (currentHash === '' && linkPath === 'index.html') {
                link.classList.add('active');
            } else if (currentHash !== '' && linkPath === 'index.html' + currentHash) {
                link.classList.add('active');
            }
        }
    });
}

// Run on load and hash change
window.addEventListener('load', updateActiveMenu);
window.addEventListener('hashchange', updateActiveMenu);

// Also update when clicking a link directly
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
        }
        
        // If clicking a section link on the same page, update immediately
        if(link.getAttribute('href').startsWith('index.html#') && (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/'))) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ==========================================
// Counter Animation (Auto Count-Up)
// Numbers count up when they scroll into view
// ==========================================
function animateCounters() {
    // Find all h2 elements inside the red stats section
    const statsSections = document.querySelectorAll('.section-padding[style*="--primary"], .stats-section');
    
    statsSections.forEach(section => {
        const counters = section.querySelectorAll('h2');
        
        counters.forEach(counter => {
            const text = counter.textContent.trim();
            
            // Parse the number and suffix (e.g., "10+" -> 10, "+")
            const match = text.match(/^([\d]+)(.*)/);
            if (!match) return;
            
            const target = parseInt(match[1]);
            const suffix = match[2] || '';
            
            // Don't re-animate
            if (counter.dataset.animated === 'true') return;
            counter.dataset.animated = 'true';
            
            // Start from 0 and count up
            let current = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // ~60fps
            
            counter.textContent = '0' + suffix;
            
            const updateCounter = () => {
                current += increment;
                if (current >= target) {
                    current = target;
                    counter.textContent = target + suffix;
                    return;
                }
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            };
            
            requestAnimationFrame(updateCounter);
        });
    });
}

// Intersection Observer - trigger counter when section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observe all stats sections
document.addEventListener('DOMContentLoaded', () => {
    // Target the red background stats sections
    const targets = document.querySelectorAll('.section-padding[style*="primary"]');
    targets.forEach(el => statsObserver.observe(el));
    
    // Also look for stats-section class
    const statsClass = document.querySelectorAll('.stats-section');
    statsClass.forEach(el => statsObserver.observe(el));
});

// ==========================================
// FAQ Accordion Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// ==========================================
// Scroll Animations (Fade In on Scroll)
// ==========================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.service-card, .event-card, .founder-card, .dual-content, .dual-image');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});
