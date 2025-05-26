  // // Quote Management System
  //     class QuoteManager {
  //       constructor() {
  //         this.storageKey = "pavs_roofing_quotes";
  //         this.init();
  //       }

  //       init() {
  //         this.updateSubmissionCount();
  //       }

  //       generateQuoteNumber() {
  //         const now = new Date();
  //         const year = now.getFullYear();
  //         const month = String(now.getMonth() + 1).padStart(2, "0");
  //         const day = String(now.getDate()).padStart(2, "0");
  //         const time =
  //           String(now.getHours()).padStart(2, "0") +
  //           String(now.getMinutes()).padStart(2, "0");
  //         const random = Math.floor(Math.random() * 100)
  //           .toString()
  //           .padStart(2, "0");

  //         return `PRS-${year}${month}${day}-${time}${random}`;
  //       }

  //       saveQuote(quoteData) {
  //         try {
  //           const quotes = this.getQuotes();
  //           const quoteNumber = this.generateQuoteNumber();

  //           const quote = {
  //             quoteNumber: quoteNumber,
  //             ...quoteData,
  //             submittedAt: new Date().toISOString(),
  //             status: "new",
  //           };

  //           quotes.push(quote);

  //           // Store in memory (in a real app, this would go to a database)
  //           localStorage.setItem(this.storageKey, JSON.stringify(quotes));

  //           console.log("Quote saved:", quote);
  //           this.updateSubmissionCount();

  //           return quote;
  //         } catch (error) {
  //           console.error("Error saving quote:", error);
  //           throw error;
  //         }
  //       }

  //       getQuotes() {
  //         try {
  //           const quotes = localStorage.getItem(this.storageKey);
  //           return quotes ? JSON.parse(quotes) : [];
  //         } catch (error) {
  //           console.error("Error retrieving quotes:", error);
  //           return [];
  //         }
  //       }

  //       clearQuotes() {
  //         localStorage.removeItem(this.storageKey);
  //         this.updateSubmissionCount();
  //         this.displaySubmissions();
  //       }

  //       updateSubmissionCount() {
  //         const count = this.getQuotes().length;
  //         document.getElementById("submissionCount").textContent = count;
  //       }

  //       displaySubmissions() {
  //         const quotes = this.getQuotes();
  //         const container = document.getElementById("submissionsList");

  //         if (quotes.length === 0) {
  //           container.innerHTML =
  //             '<p class="text-muted">No submissions yet.</p>';
  //           return;
  //         }

  //         const html = quotes
  //           .reverse()
  //           .map(
  //             (quote) => `
  //                   <div class="submission-item">
  //                       <div class="fw-bold text-primary">${
  //                         quote.quoteNumber
  //                       }</div>
  //                       <div><strong>${quote.firstName} ${
  //               quote.lastName
  //             }</strong></div>
  //                       <div><i class="fas fa-envelope me-1"></i> ${
  //                         quote.email
  //                       }</div>
  //                       <div><i class="fas fa-phone me-1"></i> ${
  //                         quote.phone
  //                       }</div>
  //                       <div><i class="fas fa-map-marker-alt me-1"></i> ${
  //                         quote.address
  //                       }, ${quote.suburb} ${quote.postcode}</div>
  //                       <div><i class="fas fa-wrench me-1"></i> ${this.getServiceName(
  //                         quote.serviceType
  //                       )}</div>
  //                       ${
  //                         quote.roofType
  //                           ? `<div><i class="fas fa-home me-1"></i> ${this.getRoofTypeName(
  //                               quote.roofType
  //                             )}</div>`
  //                           : ""
  //                       }
  //                       ${
  //                         quote.timeframe
  //                           ? `<div><i class="fas fa-clock me-1"></i> ${this.getTimeframeName(
  //                               quote.timeframe
  //                             )}</div>`
  //                           : ""
  //                       }
  //                       ${
  //                         quote.message
  //                           ? `<div class="mt-1"><small class="text-muted">"${quote.message.substring(
  //                               0,
  //                               100
  //                             )}${
  //                               quote.message.length > 100 ? "..." : ""
  //                             }"</small></div>`
  //                           : ""
  //                       }
  //                       <div class="text-muted small mt-1">
  //                           <i class="fas fa-calendar me-1"></i> ${new Date(
  //                             quote.submittedAt
  //                           ).toLocaleString()}
  //                       </div>
  //                   </div>
  //               `
  //           )
  //           .join("");

  //         container.innerHTML = html;
  //       }

  //       getServiceName(value) {
  //         const services = {
  //           "roof-replacement": "Complete Roof Replacement",
  //           "roof-repairs": "Roof Repairs",
  //           "roof-maintenance": "Roof Maintenance",
  //           "roof-inspection": "Roof Inspection",
  //           "gutter-installation": "Gutter Installation",
  //           "emergency-repairs": "Emergency Repairs",
  //           other: "Other",
  //         };
  //         return services[value] || value;
  //       }

  //       getRoofTypeName(value) {
  //         const types = {
  //           tile: "Tile Roof",
  //           metal: "Metal Roof",
  //           asbestos: "Asbestos Roof",
  //           slate: "Slate Roof",
  //           concrete: "Concrete Roof",
  //           other: "Other/Not Sure",
  //         };
  //         return types[value] || value;
  //       }

  //       getTimeframeName(value) {
  //         const timeframes = {
  //           asap: "As soon as possible",
  //           "1-2weeks": "Within 1-2 weeks",
  //           "1month": "Within 1 month",
  //           "3months": "Within 3 months",
  //           flexible: "I'm flexible",
  //         };
  //         return timeframes[value] || value;
  //       }
  //     }

  //     // Initialize Quote Manager
  //     const quoteManager = new QuoteManager();

  //     // Form handling
  //     document.addEventListener("DOMContentLoaded", () => {
  //       const form = document.getElementById("contactForm");
  //       const submitBtn = document.getElementById("submitBtn");
  //       const btnText = submitBtn.querySelector(".btn-text");
  //       const btnSpinner = submitBtn.querySelector(".btn-spinner");
  //       const successMessage = document.getElementById("successMessage");
  //       const errorMessage = document.getElementById("errorMessage");
  //       const quoteNumberElement = document.getElementById("quoteNumber");

  //       // Form submission handler
  //       form.addEventListener("submit", async (e) => {
  //         e.preventDefault();

  //         // Hide any existing messages
  //         hideMessages();

  //         // Validate form
  //         if (!form.checkValidity()) {
  //           e.stopPropagation();
  //           form.classList.add("was-validated");
  //           return;
  //         }

  //         // Show loading state
  //         showLoadingState();

  //         try {
  //           // Collect form data
  //           const formData = new FormData(form);
  //           const quoteData = {};

  //           for (let [key, value] of formData.entries()) {
  //             if (key !== "privacy") {
  //               quoteData[key] = value;
  //             }
  //           }

  //           // Simulate processing time
  //           await new Promise((resolve) => setTimeout(resolve, 2000));

  //           // Save quote and get quote number
  //           const savedQuote = quoteManager.saveQuote(quoteData);

  //           // Show success message with quote number
  //           quoteNumberElement.textContent = savedQuote.quoteNumber;
  //           showSuccessMessage();
  //           resetForm();
  //         } catch (error) {
  //           console.error("Error saving quote:", error);
  //           showErrorMessage();
  //         } finally {
  //           hideLoadingState();
  //         }
  //       });

  //       // Real-time validation
  //       const inputs = form.querySelectorAll("input, select, textarea");
  //       inputs.forEach((input) => {
  //         input.addEventListener("blur", function () {
  //           validateField(this);
  //         });

  //         input.addEventListener("input", function () {
  //           // Clear validation state when user starts typing
  //           if (this.classList.contains("is-invalid")) {
  //             this.classList.remove("is-invalid");
  //           }
  //         });
  //       });

  //       // Phone number formatting
  //       const phoneInput = document.getElementById("phone");
  //       phoneInput.addEventListener("input", (e) => {
  //         let value = e.target.value.replace(/\D/g, "");

  //         // Format as Australian phone number
  //         if (value.length >= 10) {
  //           if (value.startsWith("04")) {
  //             // Mobile format: 0412 345 678
  //             value = value.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  //           } else if (value.startsWith("0")) {
  //             // Landline format: (02) 1234 5678 or similar
  //             if (value.length === 10) {
  //               value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2 $3");
  //             }
  //           }
  //         }

  //         e.target.value = value;
  //       });

  //       // Postcode validation
  //       const postcodeInput = document.getElementById("postcode");
  //       postcodeInput.addEventListener("input", (e) => {
  //         let value = e.target.value.replace(/\D/g, "");
  //         if (value.length > 4) {
  //           value = value.slice(0, 4);
  //         }
  //         e.target.value = value;
  //       });

  //       // Function to validate individual field
  //       function validateField(field) {
  //         const isValid = field.checkValidity();

  //         if (isValid) {
  //           field.classList.remove("is-invalid");
  //           field.classList.add("is-valid");
  //         } else {
  //           field.classList.remove("is-valid");
  //           field.classList.add("is-invalid");
  //         }

  //         return isValid;
  //       }

  //       // Function to show loading state
  //       function showLoadingState() {
  //         submitBtn.disabled = true;
  //         submitBtn.classList.add("submitting");
  //         btnText.textContent = "Sending...";
  //         btnSpinner.classList.remove("d-none");
  //       }

  //       // Function to hide loading state
  //       function hideLoadingState() {
  //         submitBtn.disabled = false;
  //         submitBtn.classList.remove("submitting");
  //         btnText.textContent = "Get My Free Quote";
  //         btnSpinner.classList.add("d-none");
  //       }

  //       // Function to show success message
  //       function showSuccessMessage() {
  //         successMessage.classList.remove("d-none");
  //         successMessage.scrollIntoView({
  //           behavior: "smooth",
  //           block: "center",
  //         });
  //       }

  //       // Function to show error message
  //       function showErrorMessage() {
  //         errorMessage.classList.remove("d-none");
  //         errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });

  //         // Hide after 8 seconds
  //         setTimeout(() => {
  //           errorMessage.classList.add("d-none");
  //         }, 8000);
  //       }

  //       // Function to hide all messages
  //       function hideMessages() {
  //         successMessage.classList.add("d-none");
  //         errorMessage.classList.add("d-none");
  //       }

  //       // Function to reset form
  //       function resetForm() {
  //         form.reset();
  //         form.classList.remove("was-validated");

  //         // Remove validation classes from all fields
  //         inputs.forEach((input) => {
  //           input.classList.remove("is-valid", "is-invalid");
  //         });
  //       }

  //       // Enhanced form validation messages
  //       const customValidationMessages = {
  //         firstName: "Please enter your first name",
  //         lastName: "Please enter your last name",
  //         email: "Please enter a valid email address (e.g., john@example.com)",
  //         phone: "Please enter a valid Australian phone number",
  //         address: "Please enter the property address where work is needed",
  //         suburb: "Please enter the suburb",
  //         postcode: "Please enter a valid 4-digit Australian postcode",
  //         serviceType: "Please select the type of service you need",
  //         privacy: "You must agree to our privacy terms to continue",
  //       };

  //       // Apply custom validation messages
  //       Object.keys(customValidationMessages).forEach((fieldName) => {
  //         const field = document.getElementById(fieldName);
  //         if (field) {
  //           field.addEventListener("invalid", function () {
  //             this.setCustomValidity(customValidationMessages[fieldName]);
  //           });

  //           field.addEventListener("input", function () {
  //             this.setCustomValidity("");
  //           });
  //         }
  //       });
  //     });

  //     // Admin panel functions
  //     function toggleSubmissions() {
  //       const list = document.getElementById("submissionsList");
  //       if (list.style.display === "none") {
  //         list.style.display = "block";
  //         quoteManager.displaySubmissions();
  //       } else {
  //         list.style.display = "none";
  //       }
  //     }

  //     function clearSubmissions() {
  //       if (confirm("Are you sure you want to clear all submissions?")) {
  //         quoteManager.clearQuotes();
  //       }
  //     }

  // Updated frontend JavaScript to work with database backend
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const quoteNumberElement = document.getElementById('quoteNumber');

    // Form submission handler
    form.addEventListener('submit', async (e) => {
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
        
        // Track form submission start
        await trackFormInteraction('form_submit_start');
        
        try {
            // Collect form data
            const formData = new FormData(form);
            const quoteData = {};
            
            for (let [key, value] of formData.entries()) {
                if (key !== 'privacy') {
                    quoteData[key] = value;
                }
            }

            // Submit to backend API
            const response = await fetch('/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quoteData)
            });

            const result = await response.json();

            if (result.success) {
                // Show success message with quote number
                quoteNumberElement.textContent = result.quoteNumber;
                showSuccessMessage();
                resetForm();
                
                // Track successful submission
                await trackFormInteraction('form_submit_success', result.quoteNumber);
                
                console.log('Quote submitted successfully:', result);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Error submitting quote:', error);
            showErrorMessage(error.message);
            
            // Track failed submission
            await trackFormInteraction('form_submit_error', error.message);
        } finally {
            hideLoadingState();
        }
    });

    // Real-time validation and interaction tracking
    const inputs = form.querySelectorAll('input, select, textarea');
    let formStarted = false;
    
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

    // validation of individual fields 

    //    const capitalizeWords = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());


    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
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
    postcodeInput.addEventListener('input', (e) => {
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
    }

    // Function to show error message
    function showErrorMessage(customMessage = null) {
        const errorText = errorMessage.querySelector('p');
        if (customMessage) {
            errorText.innerHTML = `${customMessage}. Please try again or call us directly at <a href="tel:0412345678">0412 345 678</a>.`;
        }
        
        errorMessage.classList.remove('d-none');
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide after 10 seconds
        setTimeout(() => {
            errorMessage.classList.add('d-none');
        }, 10000);
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

    // Track form abandonment
    let formCompleted = false;
    
    // Track when user leaves the page with incomplete form
    window.addEventListener('beforeunload', () => {
        if (formStarted && !formCompleted) {
            trackFormInteraction('form_abandoned');
        }
    });

    // Mark form as completed when successfully submitted
    form.addEventListener('submit', () => {
        if (form.checkValidity()) {
            formCompleted = true;
        }
    });

    // Function to track form interactions
    async function trackFormInteraction(action, field = null) {
        try {
            // Console log for debugging
            console.log('Form interaction:', action, field);
            
            // Send to analytics endpoint
            await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: action,
                    field: field
                })
            });
        } catch (error) {
            console.log('Analytics tracking error:', error);
        }
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Admin Panel Functions (for demo/testing)
class AdminPanel {
    constructor() {
        this.init();
    }

    async init() {
        await this.updateStats();
        this.setupEventListeners();
    }

    async updateStats() {
        try {
            const response = await fetch('/api/dashboard/stats');
            const result = await response.json();
            
            if (result.success) {
                this.displayStats(result.stats);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    }

    displayStats(stats) {
        const submissionCount = document.getElementById('submissionCount');
        if (submissionCount) {
            submissionCount.textContent = stats.totalQuotes || 0;
        }
    }

    setupEventListeners() {
        // Auto-refresh stats every 30 seconds
        setInterval(() => {
            this.updateStats();
        }, 30000);
    }

    async loadSubmissions() {
        try {
            const response = await fetch('/api/quotes?limit=20');
            const result = await response.json();
            
            if (result.success) {
                this.displaySubmissions(result.quotes);
            }
        } catch (error) {
            console.error('Error loading submissions:', error);
        }
    }

    displaySubmissions(quotes) {
        const container = document.getElementById('submissionsList');
        
        if (!quotes || quotes.length === 0) {
            container.innerHTML = '<p class="text-muted">No submissions yet.</p>';
            return;
        }

        const html = quotes.map(quote => `
            <div class="submission-item">
                <div class="fw-bold text-primary">${quote.quote_number}</div>
                <div><strong>${quote.first_name} ${quote.last_name}</strong></div>
                <div><i class="fas fa-envelope me-1"></i> ${quote.email}</div>
                <div><i class="fas fa-phone me-1"></i> ${quote.phone}</div>
                <div><i class="fas fa-map-marker-alt me-1"></i> ${quote.address}, ${quote.suburb} ${quote.postcode}</div>
                <div><i class="fas fa-wrench me-1"></i> ${this.getServiceName(quote.service_type)}</div>
                ${quote.roof_type ? `<div><i class="fas fa-home me-1"></i> ${this.getRoofTypeName(quote.roof_type)}</div>` : ''}
                ${quote.timeframe ? `<div><i class="fas fa-clock me-1"></i> ${this.getTimeframeName(quote.timeframe)}</div>` : ''}
                <div class="badge bg-${this.getStatusColor(quote.status)} mt-1">${quote.status.toUpperCase()}</div>
                ${quote.message ? `<div class="mt-1"><small class="text-muted">"${quote.message.substring(0, 100)}${quote.message.length > 100 ? '...' : ''}"</small></div>` : ''}
                <div class="text-muted small mt-1">
                    <i class="fas fa-calendar me-1"></i> ${new Date(quote.created_at).toLocaleString()}
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    getServiceName(value) {
        const services = {
            'roof-replacement': 'Complete Roof Replacement',
            'roof-repairs': 'Roof Repairs',
            'roof-maintenance': 'Roof Maintenance',
            'roof-inspection': 'Roof Inspection',
            'gutter-installation': 'Gutter Installation',
            'emergency-repairs': 'Emergency Repairs',
            'other': 'Other'
        };
        return services[value] || value;
    }

    getRoofTypeName(value) {
        const types = {
            'tile': 'Tile Roof',
            'metal': 'Metal Roof',
            'asbestos': 'Asbestos Roof',
            'slate': 'Slate Roof',
            'concrete': 'Concrete Roof',
            'other': 'Other/Not Sure'
        };
        return types[value] || value;
    }

    getTimeframeName(value) {
        const timeframes = {
            'asap': 'As soon as possible',
            '1-2weeks': 'Within 1-2 weeks',
            '1month': 'Within 1 month',
            '3months': 'Within 3 months',
            'flexible': 'I\'m flexible'
        };
        return timeframes[value] || value;
    }

    getStatusColor(status) {
        const colors = {
            'new': 'primary',
            'contacted': 'info',
            'quoted': 'warning',
            'completed': 'success',
            'cancelled': 'secondary'
        };
        return colors[status] || 'secondary';
    }
}

// Initialize admin panel if elements exist
if (document.getElementById('submissionCount')) {
    const adminPanel = new AdminPanel();
    
    // Global functions for admin buttons
    window.toggleSubmissions = async function() {
        const list = document.getElementById('submissionsList');
        if (list.style.display === 'none') {
            list.style.display = 'block';
            await adminPanel.loadSubmissions();
        } else {
            list.style.display = 'none';
        }
    };
    
    window.clearSubmissions = async function() {
        if (confirm('Are you sure you want to clear all submissions? This action cannot be undone.')) {
            // This would require an admin delete endpoint - not implemented for security
            alert('Clear function would require admin authentication in production');
        }
    };
}