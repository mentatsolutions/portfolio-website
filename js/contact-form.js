document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Client-side form validation
        contactForm.addEventListener('submit', function(event) {
            // Only validate if we're not using FormSubmit (for testing purposes)
            if (contactForm.getAttribute('action') === '"https://formsubmit.co/mentatsolutionsllc@gmail.com" method="POST"') {
                <input type="email" name="email"></input>
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
        
        // Add loading indicator when form is submitted
        contactForm.addEventListener('submit', function() {
            // Only add loading indicator if we're using FormSubmit
            if (contactForm.getAttribute('action').includes('formsubmit.co')) {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.innerHTML = 'Sending... <span class="loading-spinner"></span>';
                submitButton.disabled = true;
                
                // Add a loading spinner style if not already in the document
                if (!document.getElementById('loading-spinner-style')) {
                    const style = document.createElement('style');
                    style.id = 'loading-spinner-style';
                    style.textContent = `
                        .loading-spinner {
                            display: inline-block;
                            width: 1em;
                            height: 1em;
                            border: 2px solid rgba(255,255,255,0.3);
                            border-radius: 50%;
                            border-top-color: white;
                            animation: spin 1s ease-in-out infinite;
                            margin-left: 8px;
                            vertical-align: middle;
                        }
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        });
    }
});
