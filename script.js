// Hero Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('[data-slide]');
    const dots = document.querySelectorAll('.slider-dot');
    if (!slides.length || !dots.length) return;

    let currentSlide = 1;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => {
            slide.style.opacity = '0';
        });
        const activeSlide = document.querySelector(`[data-slide="${n}"]`);
        if (activeSlide) activeSlide.style.opacity = '1';

        dots.forEach(dot => {
            dot.classList.remove('opacity-100');
            dot.classList.add('opacity-50');
        });
        const activeDot = document.querySelector(`.slider-dot[data-slide="${n}"]`);
        if (activeDot) {
            activeDot.classList.remove('opacity-50');
            activeDot.classList.add('opacity-100');
        }
        currentSlide = n;
    }

    function nextSlide() {
        let newSlide = currentSlide + 1;
        if (newSlide > slides.length) newSlide = 1;
        showSlide(newSlide);
    }

    showSlide(1);
    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(parseInt(this.getAttribute('data-slide')));
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
}

// Enhanced animation observer with staggered delays
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

// Initialize all animations
document.querySelectorAll('.animate-fade-in').forEach(el => {
    observer.observe(el);
});

// Form handling and validation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    initSlider();
    // Initialize animations
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 50}ms`;
        el.classList.add('animate-fade-in');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handler
    const teacherForm = document.getElementById('teacherForm');
    if (teacherForm) {
        teacherForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = ['fullName', 'email', 'password', 'qualification'];
            let isValid = true;
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            });

            if (isValid) {
                // Show success animation
                const submitBtn = teacherForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Registration Successful!';
                submitBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                submitBtn.classList.add('bg-green-500', 'hover:bg-green-600');
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    teacherForm.reset();
                    submitBtn.innerHTML = 'Register Now';
                    submitBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
                    submitBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
                }, 2000);
            }
        });
    }

    // Apple-like scroll animations
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-gradient');
        
        if (heroSection) {
            // Parallax effect for hero image
            const heroImage = heroSection.querySelector('img');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
            
            // Fade out header on scroll
            const header = document.querySelector('header');
            if (scrollPosition > 100) {
                header.classList.add('shadow-md', 'bg-opacity-90');
                header.classList.remove('shadow-sm', 'bg-opacity-100');
            } else {
                header.classList.remove('shadow-md', 'bg-opacity-90');
                header.classList.add('shadow-sm', 'bg-opacity-100');
            }
        }
    });
});
