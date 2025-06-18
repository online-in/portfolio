// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
const contactForm = document.querySelector('.contact');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    const submitBtn = contactForm.querySelector('.con2p2');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch(input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'tel':
                const phoneRegex = /^\d{10}$/;
                isValid = phoneRegex.test(value);
                errorMessage = 'Please enter a valid 10-digit phone number';
                break;
            default:
                isValid = value.length > 0;
                errorMessage = 'This field is required';
        }

        if (!isValid) {
            input.classList.add('error');
            input.setCustomValidity(errorMessage);
        } else {
            input.classList.remove('error');
            input.setCustomValidity('');
        }
    }

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let isValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                validateInput(input);
            }
        });

        if (isValid) {
            // Add success animation
            submitBtn.classList.add('success');
            setTimeout(() => {
                submitBtn.classList.remove('success');
                inputs.forEach(input => input.value = '');
            }, 2000);
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section-animate').forEach(section => {
    observer.observe(section);
});

// Dynamic skill progress animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Trigger skill animation when skills section is in view
const skillsSection = document.querySelector('.skill-section');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entries[0].target);
        }
    }, observerOptions);
    skillsObserver.observe(skillsSection);
}

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Add typing animation to name
const nameElement = document.querySelector('.hero-name');
if (nameElement) {
    const text = nameElement.textContent;
    nameElement.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            nameElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation when element is in view
    const nameObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            nameObserver.unobserve(entries[0].target);
        }
    }, observerOptions);
    
    nameObserver.observe(nameElement);
}

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax').forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth scroll for scroll arrows with easing
const scrollArrows = document.querySelectorAll('.scroll-arrow');
scrollArrows.forEach(arrow => {
    arrow.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)';
    });
});

// Add hover effect to experience cards
const expCards = document.querySelectorAll('.exp-card');
expCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)';
    });
});

// Add hover effect to contact pills
const contactPills = document.querySelectorAll('.contact-pill');
contactPills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
        pill.style.transform = 'translateY(-3px)';
        pill.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
    });
    
    pill.addEventListener('mouseleave', () => {
        pill.style.transform = 'translateY(0)';
        pill.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)';
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Add CSS for scroll progress
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: #222;
        z-index: 1000;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(style);

// Rainbow custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
  const hue = Math.round((e.clientX / window.innerWidth) * 360);
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor.style.borderColor = `hsl(${hue}, 80%, 60%)`;
  cursor.style.boxShadow = `0 0 16px 2px hsl(${hue}, 80%, 60%)`;
  cursor.style.background = `hsla(${hue}, 80%, 60%, 0.15)`;
});
document.querySelectorAll('a, button, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '48px';
    cursor.style.height = '48px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '32px';
    cursor.style.height = '32px';
  });
}); 