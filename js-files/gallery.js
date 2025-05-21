document.addEventListener('DOMContentLoaded', function() {
    // Gallery elements
    const galleryItems = document.querySelectorAll('.gallery-thumbnail');
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxLocation = document.querySelector('.lightbox-location');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const filterButtons = document.querySelectorAll('.gallery-filters button');
    
    // Current image index
    let currentIndex = 0;
    
    // Array to store all gallery data
    const galleryData = [];
    
    // Populate gallery data array
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-caption h5').textContent;
        const location = item.querySelector('.gallery-caption p').textContent;
        
        galleryData.push({
            src: img.src,
            alt: img.alt,
            title: title,
            location: location,
            element: item,
            category: item.parentElement.dataset.category
        });
        
        // Add click event to each thumbnail
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Function to open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close lightbox
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Function to update lightbox content
    function updateLightboxContent() {
        const currentItem = galleryData[currentIndex];
        
        // Use opacity transition for smooth image change
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = currentItem.src;
            lightboxImage.alt = currentItem.alt;
            lightboxTitle.textContent = currentItem.title;
            lightboxLocation.textContent = currentItem.location;
            lightboxImage.style.opacity = '1';
        }, 300);
    }
    
    // Function to navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateLightboxContent();
    }
    
    // Function to navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateLightboxContent();
    }
    
    // Event listeners for lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Close lightbox when clicking outside the image
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Handle category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                    // Adding a slight animation
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Layout adjustment animation
            const container = document.querySelector('.gallery-container');
            container.style.opacity = '0.8';
            setTimeout(() => {
                container.style.opacity = '1';
            }, 300);
        });
    });
    
    // Implement preloading for smoother experience
    function preloadGalleryImages() {
        galleryData.forEach(item => {
            const img = new Image();
            img.src = item.src;
        });
    }
    
    // Call preload function
    preloadGalleryImages();
});