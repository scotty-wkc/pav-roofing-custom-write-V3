 document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (username && password) {
                // Add loading state
                const submitBtn = document.querySelector('.btn-login');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Logging in...';
                submitBtn.disabled = true;
                
                // Simulate login process
                setTimeout(() => {
                    // Redirect to admin page
                    window.location.href = '../admin.html';
                }, 1000);
            } else {
                alert('Please fill in all fields');
            }
        });

        // Add focus effects
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.querySelector('.input-icon').style.color = 'var(--primary-color)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.querySelector('.input-icon').style.color = '#a0aec0';
            });
        });