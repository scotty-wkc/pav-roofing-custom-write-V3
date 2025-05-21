// project-details.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project details page functionality
    initProjectDetailsPage();
});

function initProjectDetailsPage() {
    // Initialize image gallery/carousel
    initializeCarousel();

    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize lightbox for project images
    initLightbox();

    // Setup similar projects hover effects
    setupSimilarProjectsHover();

    // Init scroll to top button
    initScrollToTopButton();

    // Setup project gallery navigation
    setupProjectGalleryNav();
}

function initializeCarousel() {
    // Bootstrap carousel is auto-initialized, but we can add custom options if needed
    const projectCarousel = document.getElementById('projectCarousel');
    if (projectCarousel) {
        // If we need more customization beyond the default Bootstrap carousel
        const carousel = new bootstrap.Carousel(projectCarousel, {
            interval: 5000,
            keyboard: true,
            pause: 'hover'
        });

        // Add swipe support for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;

        projectCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        projectCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next slide
                carousel.next();
            } else if (touchEndX > touchStartX + 50) {
                // Swipe right - previous slide
                carousel.prev();
            }
        }
    }
}

function initLightbox() {
    // Find all carousel images and add click event to show enlarged version
    const carouselImages = document.querySelectorAll('#projectCarousel .carousel-item img');
    
    carouselImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create a lightbox container
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '9999';
            
            // Create the image element
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.objectFit = 'contain';
            
            // Add close button
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '30px';
            closeBtn.style.color = 'white';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.fontWeight = 'bold';
            closeBtn.style.cursor = 'pointer';
            
            // Add event listener to close the lightbox
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            // Click anywhere to close
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
            
            // Append elements to the lightbox
            lightbox.appendChild(enlargedImg);
            lightbox.appendChild(closeBtn);
            
            // Append the lightbox to the body
            document.body.appendChild(lightbox);
        });
    });
}

function setupSimilarProjectsHover() {
    // Add hover animations to similar project cards
    const similarProjects = document.querySelectorAll('.similar-project');
    
    similarProjects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(5px)';
            this.style.color = '#007bff';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '#343a40';
        });
    });
}

function initScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'flex';
                scrollToTopBtn.style.opacity = '1';
            } else {
                scrollToTopBtn.style.opacity = '0';
                // Hide after transition completes
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        scrollToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Add click event to scroll to top
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function setupProjectGalleryNav() {
    // Add keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        const carousel = document.getElementById('projectCarousel');
        if (carousel) {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            
            if (e.key === 'ArrowLeft') {
                carouselInstance.prev();
            } else if (e.key === 'ArrowRight') {
                carouselInstance.next();
            }
        }
    });
    
    // Add project gallery thumbnails if they exist
    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
    if (thumbnailsContainer) {
        const carouselItems = document.querySelectorAll('#projectCarousel .carousel-item img');
        
        carouselItems.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = index === 0 ? 'thumbnail active' : 'thumbnail';
            thumbnail.style.backgroundImage = `url(${item.src})`;
            
            thumbnail.addEventListener('click', function() {
                const carousel = bootstrap.Carousel.getInstance(document.getElementById('projectCarousel'));
                carousel.to(index);
                
                // Update active thumbnail
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                this.classList.add('active');
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
    }
}