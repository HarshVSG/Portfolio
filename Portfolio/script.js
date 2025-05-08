// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation items based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission handler with animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add submission animation
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        // Change button text and add loading state
        btn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        btn.disabled = true;
        
        // Simulate sending message (replace with actual AJAX in production)
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            btn.style.backgroundColor = 'var(--success-color)';
            
            // Show success message
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.opacity = '0.5';
            });
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
                
                formGroups.forEach(group => {
                    group.style.opacity = '1';
                });
            }, 3000);
        }, 2000);
    });
}

// Simple animation for skill items
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Add a simple loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Animate elements when they enter the viewport
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .about-img, .about-text, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in-up');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Theme toggle functionality (light/dark mode)
// Note: Add a theme toggle button to your HTML to use this
const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
};

// Initialize cursor effects for a modern feel
const initCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
    
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
};

// Add hover effects for contact items
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    const icon = item.querySelector('i');
    
    item.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        icon.style.transform = '';
    });
});

// Add typing effect to the hero section tagline
const initTypeEffect = () => {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            tagline.style.borderRight = 'none';
        }
    };
    
    setTimeout(typeWriter, 1000);
};

// Add particle effect in background (modern touch)
const initParticleEffect = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particles');
    hero.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particleContainer.appendChild(particle);
    }
};

// Add this function to enhance the achievement showcase
function enhanceAchievementShowcase() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    // Create intersection observer to trigger animations when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Stagger the animation of child elements
                const overlay = entry.target.querySelector('.showcase-overlay');
                const badge = entry.target.querySelector('.showcase-badge');
                
                if (overlay) overlay.style.transitionDelay = '0.1s';
                if (badge) badge.style.transitionDelay = '0.2s';
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each showcase item
    showcaseItems.forEach(item => {
        observer.observe(item);
    });
    
    // Optional: Add hover effect to adjacent items
    showcaseItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            showcaseItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                    otherItem.style.transform = 'scale(0.95)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            showcaseItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = '';
            });
        });
    });
}

// Run initialization functions
window.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    // Uncomment the line below to enable custom cursor (optional)
    // initCustomCursor();
    
    // Reveal animations for hero section
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.style.opacity = '1';
        });
    }, 300);
    
    initTypeEffect();
    initParticleEffect();
    // Initialize the achievement showcase enhancement
    enhanceAchievementShowcase();
});
