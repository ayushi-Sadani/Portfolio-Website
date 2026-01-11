// ===========================
// Navigation Functionality
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

function activateNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===========================
// Smooth Scrolling
// ===========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Animate on Scroll
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(element => {
    observer.observe(element);
});

// ===========================
// Counter Animation
// ===========================
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateCounters() {
    if (hasAnimated) return;
    
    const aboutSection = document.getElementById('about');
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if (aboutPosition < screenPosition) {
        hasAnimated = true;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);

// ===========================
// Skill Progress Bars Animation
// ===========================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    
    const skillsSection = document.getElementById('skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if (skillsPosition < screenPosition) {
        skillsAnimated = true;
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 300);
        });
    }
}

window.addEventListener('scroll', animateSkillBars);

// ===========================
// Form Submission
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formInputs = contactForm.querySelectorAll('.form-input');
    let formData = {};
    
    formInputs.forEach(input => {
        formData[input.placeholder] = input.value;
    });
    
    // Show success message (you can customize this)
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Reset form
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 3000);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
});

// ===========================
// Typing Effect for Hero Title
// ===========================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    
    let charIndex = 0;
    let isTag = false;
    let tagBuffer = '';
    
    function typeText() {
        if (charIndex < text.length) {
            const char = text[charIndex];
            
            // Handle HTML tags
            if (char === '<') {
                isTag = true;
                tagBuffer = char;
            } else if (char === '>') {
                isTag = false;
                tagBuffer += char;
                heroTitle.innerHTML += tagBuffer;
                tagBuffer = '';
            } else if (isTag) {
                tagBuffer += char;
            } else {
                heroTitle.innerHTML += char;
            }
            
            charIndex++;
            setTimeout(typeText, isTag ? 0 : 50);
        }
    }
    
    setTimeout(typeText, 500);
}

// ===========================
// Parallax Effect for Hero Section
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const parallaxElements = hero.querySelectorAll('.floating-card');
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ===========================
// Project Card Tilt Effect
// ===========================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// Cursor Trail Effect
// ===========================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

// Create cursor circles if they don't exist
if (circles.length === 0 && window.innerWidth > 768) {
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6d4c3d, #a67c52);
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(circle);
    }
}

const createdCircles = document.querySelectorAll('.circle');
let circleArray = Array.from(createdCircles);

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circleArray.forEach((circle, index) => {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.opacity = (20 - index) / 40;
        circle.style.transform = `scale(${(20 - index) / 20})`;
        
        const nextCircle = circleArray[index + 1] || circleArray[0];
        x += (parseFloat(nextCircle.style.left) - x) * 0.3;
        y += (parseFloat(nextCircle.style.top) - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

if (window.innerWidth > 768) {
    animateCircles();
}

// ===========================
// Text Reveal Animation
// ===========================
function revealText() {
    const reveals = document.querySelectorAll('.animate-on-scroll');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealText);
revealText(); // Initial check

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Scroll to Top Button (Optional)
// ===========================
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6d4c3d, #8b6247);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(109, 76, 61, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 8px 25px rgba(109, 76, 61, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 5px 20px rgba(109, 76, 61, 0.3)';
    });
}

createScrollToTop();

// ===========================
// Dynamic Year in Footer
// ===========================
const footerText = document.querySelector('.footer p');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.innerHTML = footerText.innerHTML.replace('2026', currentYear);
}

// ===========================
// Console Message
// ===========================
console.log('%c Welcome to Aayushi\'s Portfolio! ', 'background: linear-gradient(135deg, #6d4c3d, #a67c52); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Thanks for visiting! 🚀', 'color: #6d4c3d; font-size: 16px; font-weight: bold;');

// ===========================
// Experience expand/collapse
// ===========================
(function() {
    const toggles = document.querySelectorAll('.experience-toggle');

    toggles.forEach(btn => {
        // Click toggles expansion state
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = btn.closest('.experience-item');
            if (!item) return;
            const expanded = item.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });

        // Keyboard activation
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Make header clickable and keyboard-accessible to toggle
    document.querySelectorAll('.experience-header').forEach(header => {
        header.addEventListener('click', (e) => {
            if (e.target.closest('.experience-toggle')) return; // already handled
            const btn = header.querySelector('.experience-toggle');
            if (btn) btn.click();
        });

        header.setAttribute('tabindex', '0');
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const btn = header.querySelector('.experience-toggle');
                if (btn) btn.click();
            }
        });
    });
})();
