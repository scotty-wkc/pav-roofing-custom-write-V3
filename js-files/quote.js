// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide any existing messages
        hideMessages();
        
        // Validate form
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Show loading state
        showLoadingState();
        
        // Track form submission
        trackFormInteraction('form_submit');
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Simulate random success/failure for demo
            const isSuccess = Math.random() > 0.1; // 90% success rate
            
            if (isSuccess) {
                showSuccessMessage();
                resetForm();
                trackFormInteraction('form_success');
            } else {
                showErrorMessage();
                trackFormInteraction('form_error');
            }
            
            hideLoadingState();
        }, 2000);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Track form start on first interaction
            if (!formStarted) {
                formStarted = true;
                trackFormInteraction('form_start');
            }
            
            // Clear validation state when user starts typing
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
            }
        });
        
        // Track field interactions
        input.addEventListener('focus', function() {
            trackFormInteraction('field_focus', this.name);
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as Australian phone number
        if (value.length >= 10) {
            if (value.startsWith('04')) {
                // Mobile format: 0412 345 678
                value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
            } else if (value.startsWith('0')) {
                // Landline format: (02) 1234 5678 or similar
                if (value.length === 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2 $3');
                }
            }
        }
        
        e.target.value = value;
    });

    // Postcode validation
    const postcodeInput = document.getElementById('postcode');
    postcodeInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        e.target.value = value;
    });

    // Service type change handler
    const serviceTypeSelect = document.getElementById('serviceType');
    serviceTypeSelect.addEventListener('change', function() {
        trackFormInteraction('service_selected', this.value);
    });

    // Function to validate individual field
    function validateField(field) {
        const isValid = field.checkValidity();
        
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
        
        return isValid;
    }

    // Function to show loading state
    function showLoadingState() {
        submitBtn.disabled = true;
        submitBtn.classList.add('submitting');
        btnText.textContent = 'Sending...';
        btnSpinner.classList.remove('d-none');
    }

    // Function to hide loading state
    function hideLoadingState() {
        submitBtn.disabled = false;
        submitBtn.classList.remove('submitting');
        btnText.textContent = 'Get My Free Quote';
        btnSpinner.classList.add('d-none');
    }

    // Function to show success message
    function showSuccessMessage() {
        successMessage.classList.remove('d-none');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide after 10 seconds
        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 10000);
    }

    // Function to show error message
    function showErrorMessage() {
        errorMessage.classList.remove('d-none');
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide after 8 seconds
        setTimeout(() => {
            errorMessage.classList.add('d-none');
        }, 8000);
    }

    // Function to hide all messages
    function hideMessages() {
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');
    }

    // Function to reset form
    function resetForm() {
        form.reset();
        form.classList.remove('was-validated');
        
        // Remove validation classes from all fields
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        // Reset form started flag
        formStarted = false;
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form analytics tracking
    function trackFormInteraction(action, field = null) {
        // Console log for debugging
        console.log('Form interaction:', action, field);
        
        // Google Analytics 4 event tracking (uncomment and modify as needed)
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         'event_category': 'Contact Form',
        //         'event_label': field || 'general',
        //         'custom_parameter_1': 'roofing_contact'
        //     });
        // }
        
        // Facebook Pixel tracking (uncomment and modify as needed)
        // if (typeof fbq !== 'undefined') {
        //     fbq('trackCustom', 'ContactForm_' + action, {
        //         field: field || 'general'
        //     });
        // }
        
        // Custom analytics endpoint (replace with your own)
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         action: action,
        //         field: field,
        //         timestamp: new Date().toISOString(),
        //         page: 'contact'
        //     })
        // }).catch(error => console.log('Analytics error:', error));
    }

    // Track form abandonment
    let formStarted = false;
    let formCompleted = false;
    
    // Track when user leaves the page with incomplete form
    window.addEventListener('beforeunload', function() {
        if (formStarted && !formCompleted) {
            trackFormInteraction('form_abandoned');
        }
    });

    // Mark form as completed when successfully submitted
    form.addEventListener('submit', function() {
        if (form.checkValidity()) {
            formCompleted = true;
        }
    });

    // Enhanced form validation messages
    const customValidationMessages = {
        firstName: 'Please enter your first name',
        lastName: 'Please enter your last name', 
        email: 'Please enter a valid email address (e.g., john@example.com)',
        phone: 'Please enter a valid Australian phone number',
        address: 'Please enter the property address where work is needed',
        suburb: 'Please enter the suburb',
        postcode: 'Please enter a valid 4-digit Australian postcode',
        serviceType: 'Please select the type of service you need',
        privacy: 'You must agree to our privacy terms to continue'
    };

    // Apply custom validation messages
    Object.keys(customValidationMessages).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('invalid', function() {
                this.setCustomValidity(customValidationMessages[fieldName]);
            });
            
            field.addEventListener('input', function() {
                this.setCustomValidity('');
            });
        }
    });

    // Auto-save form data to prevent loss (optional feature)
    let autoSaveTimeout;
    const autoSaveKey = 'pavs_roofing_contact_form';
    
    function autoSaveForm() {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key !== 'privacy') { // Don't save privacy checkbox state
                data[key] = value;
            }
        }
        
        try {
            sessionStorage.setItem(autoSaveKey, JSON.stringify(data));
        } catch (error) {
            console.log('Auto-save failed:', error);
        }
    }
    
    function loadSavedForm() {
        try {
            const savedData = sessionStorage.getItem(autoSaveKey);
            if (savedData) {
                const data = JSON.parse(savedData);
                
                Object.keys(data).forEach(key => {
                    const field = document.getElementById(key);
                    if (field && data[key]) {
                        field.value = data[key];
                    }
                });
            }
        } catch (error) {
            console.log('Load saved form failed:', error);
        }
    }
    
    function clearSavedForm() {
        try {
            sessionStorage.removeItem(autoSaveKey);
        } catch (error) {
            console.log('Clear saved form failed:', error);
        }
    }
    
    // Load saved form data on page load
    loadSavedForm();
    
    // Auto-save form data as user types
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(autoSaveForm, 1000); // Save after 1 second of no typing
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        if (form.checkValidity()) {
            setTimeout(clearSavedForm, 2000); // Clear after success message shows
        }
    });
});