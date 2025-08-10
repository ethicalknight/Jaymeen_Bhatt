// Hacker Portfolio JavaScript

// Global variables
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeMatrixBackground();
    initializeNavigation();
    initializeTypewriter();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeTestimonials();
    initializeCounters();
    initializeBackToTop();
    initializeContactForm();
    initializeCursor();
});

// Loading Screen
function initializeLoader() {
    const loader = document.getElementById('loader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    setTimeout(() => {
        loadingProgress.style.width = '100%';
    }, 100);
    
    // Hide loader after animation completes
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 3500);
}

// Matrix Background Animation
function initializeMatrixBackground() {
    const matrixBg = document.getElementById('matrix-bg');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixRain() {
        const columns = Math.floor(window.innerWidth / 20);
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * window.innerHeight;
        }
        
        // Create canvas for matrix effect
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        matrixBg.appendChild(canvas);
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00FF66';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * 20;
                const y = drops[i] * 20;
                
                ctx.fillText(text, x, y);
                
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
    }
    
    createMatrixRain();
}

// Navigation
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Improved active navigation link highlighting
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Get all sections with their positions
        const sections = [];
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                sections.push({
                    element: targetSection,
                    link: link,
                    top: targetSection.offsetTop - headerHeight - 50,
                    bottom: targetSection.offsetTop + targetSection.offsetHeight - headerHeight
                });
            }
        });
        
        // Sort sections by top position
        sections.sort((a, b) => a.top - b.top);
        
        // Find which section is currently in view
        let activeSection = sections[0]; // Default to first section
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const viewportCenter = scrollPosition + headerHeight + (windowHeight / 3);
            
            if (viewportCenter >= section.top && viewportCenter < section.bottom) {
                activeSection = section;
                break;
            }
            
            // If we're past this section but before the next one
            if (scrollPosition + headerHeight >= section.top) {
                activeSection = section;
            }
        }
        
        // Special case for bottom of page
        if ((window.innerHeight + scrollPosition) >= document.body.offsetHeight - 100) {
            activeSection = sections[sections.length - 1];
        }
        
        // Update active states
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeSection && activeSection.link) {
            activeSection.link.classList.add('active');
        }
    }
    
    // Throttled scroll handler for better performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Initialize on load
    updateActiveNavLink();
}

// Typewriter Effect
function initializeTypewriter() {
    const typewriter1 = document.getElementById('typewriter1');
    const typewriter2 = document.getElementById('typewriter2');
    
    function typeText(element, text, speed = 100) {
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Start typewriter effects with delays
    setTimeout(() => {
        typeText(typewriter1, 'In Code We Trust', 150);
    }, 4000);
    
    setTimeout(() => {
        typeText(typewriter2, 'Hacker by Passion | Attacker by Purpose', 100);
    }, 6500);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('tools')) {
                    setTimeout(() => animateSkillBars(), 300);
                }
                
                // Trigger counter animations
                if (entry.target.classList.contains('community')) {
                    setTimeout(() => animateCounters(), 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    window.animateSkillBars = function() {
        const skillProgresses = document.querySelectorAll('.skill-progress');
        
        skillProgresses.forEach((skill, index) => {
            const width = skill.getAttribute('data-width');
            setTimeout(() => {
                skill.style.width = width + '%';
            }, index * 200 + 300);
        });
    };
}

// Testimonials Slider
function initializeTestimonials() {
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and activate dot
        if (testimonials[index] && dots[index]) {
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Initialize first testimonial
    showTestimonial(0);
}

// Counter Animation
function initializeCounters() {
    window.animateCounters = function() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            setTimeout(() => {
                function updateCounter() {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                updateCounter();
            }, index * 200);
        });
    };
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual EmailJS or backend integration)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#00FF66';
            
            // Reset form
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Show error message
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Error! Try Again';
            submitBtn.style.background = '#FF00FF';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Copy to Clipboard
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const copyBtn = element.nextElementSibling;
        const originalIcon = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#00FF66';
        copyBtn.style.color = '#0a0a0a';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show feedback
        alert('Copied to clipboard: ' + text);
    });
}

// Custom Cursor
function initializeCursor() {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor
    function animateCursor() {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        
        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;
        
        // Update cursor position via CSS custom property would be ideal,
        // but we'll use transform for better performance
        document.body.style.setProperty('--cursor-x', cursorX + 'px');
        document.body.style.setProperty('--cursor-y', cursorY + 'px');
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .tech-item, .service-card, .project-card, .platform-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'none';
            // Could add cursor size/color changes here
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'none';
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize matrix background for new screen size
    const matrixBg = document.getElementById('matrix-bg');
    matrixBg.innerHTML = '';
    initializeMatrixBackground();
}, 250));

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation to images when they load
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '0';
        this.style.transform = 'scale(0.8)';
        this.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Console Easter Egg
console.log(`
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ ███╗   ██╗███████╗██╗  ██╗██╗  ██╗██╗   ██╗███████╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗████╗  ██║██╔════╝╚██╗██╔╝╚██╗██╔╝██║   ██║██╔════╝
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝██╔██╗ ██║█████╗   ╚███╔╝  ╚███╔╝ ██║   ██║███████╗
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗██║╚██╗██║██╔══╝   ██╔██╗  ██╔██╗ ██║   ██║╚════██║
╚██████╗   ██║   ██████╔╝███████╗██║  ██║██║ ╚████║███████╗██╔╝ ██╗██╔╝ ██╗╚██████╔╝███████║
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
                                                                                               
Welcome to Jaymeen Bhatt's Portfolio!
Ethical Hacker | Cybersecurity Enthusiast
=============================================
Looking for something? Try: help()
`);

// Console help function
window.help = function() {
    console.log(`
Available commands:
- contact() - Get contact information
- skills() - View technical skills
- projects() - List current projects
- social() - Get social media links
- hack() - ¯\\_(ツ)_/¯
    `);
};

window.contact = function() {
    console.log('📧 Email: jaymeen@ethicalhacker.com');
    console.log('📱 Phone: +91-9876543210');
};

window.skills = function() {
    console.log('🐍 Python: 85%');
    console.log('🌐 HTML: 90%');
    console.log('🎨 CSS: 80%');
    console.log('⚡ JavaScript: 75%');
};

window.projects = function() {
    console.log('🔒 Network Security Scanner');
    console.log('🌐 Web App Penetration Tool');
    console.log('🦠 Malware Analysis Lab');
};

window.social = function() {
    console.log('📷 Instagram: https://instagram.com/ethicalhacker');
    console.log('💻 GitHub: https://github.com/jaymeenbhatt');
    console.log('💼 LinkedIn: https://linkedin.com/in/jaymeenbhatt');
};

window.hack = function() {
    console.log('Access Denied! Nice try though 😄');
    console.log('Remember: Always hack ethically! 🛡️');
};