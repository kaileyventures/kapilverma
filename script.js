// =========================================
// 1. THEME TOGGLE LOGIC (FAIL-PROOF)
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check LocalStorage on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme'); // Apply Light Theme if saved
} else {
    body.classList.remove('light-theme'); // Default to Dark Theme
}

themeToggleBtn.addEventListener('click', () => {
    // Toggle the .light-theme class on body
    body.classList.toggle('light-theme');
    
    // Save preference
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// =========================================
// 2. MOBILE MENU LOGIC
// =========================================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

function toggleMenu() {
    const isActive = mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    const line1 = document.querySelector('.line-1');
    const line2 = document.querySelector('.line-2');
    
    if (isActive) {
        line1.style.transform = 'translateY(3.5px) rotate(45deg)';
        line2.style.transform = 'translateY(-3.5px) rotate(-45deg)';
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        line1.style.transform = 'none';
        line2.style.transform = 'none';
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

hamburger.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-link, .mt-custom').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) toggleMenu();
    });
});

// =========================================
// 3. SCROLL REVEAL (INTERSECTION OBSERVER)
// =========================================
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -20px 0px" };

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target); 
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

// =========================================
// 4. 3D TILT EFFECT (DESKTOP ONLY)
// =========================================
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -3; 
            const rotateY = ((x - centerX) / centerX) * 3;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        });
    });
}

// =========================================
// 5. FORM SUBMISSION FEEDBACK
// =========================================
document.getElementById('leadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.textContent;
    
    btn.textContent = 'Transmitting...';
    btn.style.opacity = '0.8';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = 'Parameters Received ✓';
        btn.style.background = 'var(--gold-accent)'; 
        btn.style.color = '#fff';
        btn.style.opacity = '1';
        e.target.reset();
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 4000);
    }, 1500);
});