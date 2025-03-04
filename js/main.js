/**
 * Main JavaScript for Portfolio Website
 * Author: Wendell White
 * Version: 1.1
 */

document.addEventListener('DOMContentLoaded', function() {
    // Carousel Functionality
    initCarousel();
    
    // DOM Elements
    const header = document.getElementById('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const contactForm = document.getElementById('contactForm');
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when a nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Scroll Event for Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (phoneInput.value.trim() === '') {
                showError(phoneInput, 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phoneInput.value)) {
                showError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            } else {
                removeError(phoneInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, submit it (in a real application, you would send the data to a server)
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                // Insert success message after the form
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Helper Functions
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // This is a simple validation for demonstration
        // In a real application, you might want to use a more sophisticated validation
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/[\s\-\(\)]/g, '').length >= 10;
    }
    
    // Add CSS for form validation
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ff3860;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 0.8rem;
            margin-top: 5px;
        }
        
        .success-message {
            background-color: #23d160;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
    
    // Carousel Functions
    function initCarousel() {
        // Initialize Certifications Carousel
        initCertificationsCarousel();
        
        // Initialize Portfolio Carousel
        initPortfolioCarousel();
    }
    
    // Certifications Carousel
    function initCertificationsCarousel() {
        const slides = document.querySelectorAll('.cert-slide');
        const dots = document.querySelectorAll('.cert-dots .carousel-dot');
        const prevBtn = document.querySelector('.cert-prev');
        const nextBtn = document.querySelector('.cert-next');
        
        if (!slides.length) return;
        
        // Set initial active slide
        if (!slides[0].classList.contains('active')) {
            slides[0].classList.add('active');
        }
        
        // Event listeners for carousel navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                navigateCarousel(slides, dots, 'prev');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                navigateCarousel(slides, dots, 'next');
            });
        }
        
        // Event listeners for carousel dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showSlide(slides, dots, index);
            });
        });
    }
    
    // Portfolio Carousel
    function initPortfolioCarousel() {
        const slides = document.querySelectorAll('.project-slide');
        const dots = document.querySelectorAll('.project-dots .carousel-dot');
        const prevBtn = document.querySelector('.project-prev');
        const nextBtn = document.querySelector('.project-next');
        
        if (!slides.length) return;
        
        // Set initial active slide
        if (!slides[0].classList.contains('active')) {
            slides[0].classList.add('active');
        }
        
        // Event listeners for carousel navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                navigateCarousel(slides, dots, 'prev');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                navigateCarousel(slides, dots, 'next');
            });
        }
        
        // Event listeners for carousel dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showSlide(slides, dots, index);
            });
        });
    }
    
    // Generic carousel navigation function
    function navigateCarousel(slides, dots, direction) {
        let currentIndex = 0;
        
        // Find current active slide
        slides.forEach((slide, index) => {
            if (slide.classList.contains('active')) {
                currentIndex = index;
            }
        });
        
        // Calculate next index
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % slides.length;
        } else {
            nextIndex = (currentIndex - 1 + slides.length) % slides.length;
        }
        
        // Update active slide and dot
        showSlide(slides, dots, nextIndex);
    }
    
    // Generic function to show a specific slide
    function showSlide(slides, dots, index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        
        // Update active dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
});
