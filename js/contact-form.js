document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation
        contactForm.addEventListener('submit', function(event) {
            // Only validate if not using Formspree (when form action is "#")
            if (contactForm.getAttribute('action') === '#') {
                event.preventDefault();
                
                let isValid = true;
                const formElements = contactForm.elements;
                
                // Remove any existing error messages
                const errorMessages = contactForm.querySelectorAll('.error-message');
                errorMessages.forEach(message => message.remove());
                
                // Remove error class from all inputs
                const formInputs = contactForm.querySelectorAll('input, textarea');
                formInputs.forEach(input => input.classList.remove('error'));
                
                // Validate each required field
                for (let i = 0; i < formElements.length; i++) {
                    const element = formElements[i];
                    
                    if (element.hasAttribute('required') && element.value.trim() === '') {
                        isValid = false;
                        element.classList.add('error');
                        
                        // Add error message
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required';
                        element.parentNode.appendChild(errorMessage);
                    }
                    
                    // Validate email format
                    if (element.type === 'email' && element.value.trim() !== '') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(element.value.trim())) {
                            isValid = false;
                            element.classList.add('error');
                            
                            // Add error message
                            const errorMessage = document.createElement('div');
                            errorMessage.className = 'error-message';
                            errorMessage.textContent = 'Please enter a valid email address';
                            element.parentNode.appendChild(errorMessage);
                        }
                    }
                }
                
                // If form is valid, show success message and reset form
                if (isValid) {
                    // Remove any existing success message
                    const existingSuccess = document.querySelector('.success-message');
                    if (existingSuccess) {
                        existingSuccess.remove();
                    }
                    
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Your message has been sent successfully!';
                    contactForm.appendChild(successMessage);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }
            }
        });
    }
    
    // Helper function to check if Formspree is properly configured
    function isFormspreeConfigured() {
        const formAction = contactForm.getAttribute('action');
        return formAction && formAction.includes('formspree.io') && !formAction.includes('YOUR_FORM_ID');
    }
    
    // Show warning if Formspree is not configured
    if (contactForm && !isFormspreeConfigured()) {
        console.warn('Formspree is not properly configured. Please replace YOUR_FORM_ID with your actual Formspree form ID.');
    }
});
