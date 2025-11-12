// SkillManager JavaScript functionality

// Navigation function
function navigateToLogin() {
    // In a real implementation, this would navigate to the login page
    alert('Navegando para a página de login...');
}

// Simple animation for feature cards when they come into view
const featureCards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

featureCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Button hover effects enhancement
const buttons = document.querySelectorAll('.btn-primary, .cta-button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation for CTA form
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enhanced CTA form handling
document.addEventListener('DOMContentLoaded', function() {
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.querySelector('.cta-input');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Por favor, insira seu e-mail');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Por favor, insira um e-mail válido');
                return;
            }
            
            // In a real implementation, you would send the form data to a server here
            alert('Obrigado! Enviaremos informações para o seu e-mail em breve.');
            emailInput.value = '';
        });
    }
});

// Simple counter animation for stats
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            
            if (text.includes('+')) {
                const number = parseInt(text);
                element.textContent = '0+';
                animateCounter(element, 0, number, 2000);
            } else if (text.includes('%')) {
                const number = parseInt(text);
                element.textContent = '0%';
                animateCounter(element, 0, number, 2000);
            } else if (text.includes('.')) {
                const number = parseFloat(text);
                element.textContent = '0.0';
                animateCounter(element, 0, number * 10, 2000);
                // For decimal numbers, we multiply by 10 and then divide by 10 in display
            }
            
            // Stop observing this element
            statObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});