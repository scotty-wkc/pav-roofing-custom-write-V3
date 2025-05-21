// projects.js

document.addEventListener('DOMContentLoaded', function() {
  // Initialize project filtering and interaction features
  initProjectsPage();
  
  // Scroll to section if URL has hash
  if (window.location.hash) {
    const targetAccordion = document.querySelector(window.location.hash);
    if (targetAccordion) {
      setTimeout(() => {
        window.scrollTo({
          top: targetAccordion.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Open the correct accordion if it exists
        const accordionButton = targetAccordion.querySelector('.accordion-button');
        if (accordionButton && accordionButton.classList.contains('collapsed')) {
          accordionButton.click();
        }
      }, 300);
    }
  }
});

function initProjectsPage() {
  // Add hover effects for project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Add animation delay to stagger hover effects
    const overlay = card.querySelector('.project-overlay');
    if (overlay) {
      overlay.style.transitionDelay = Math.random() * 0.1 + 's';
    }
    
    // Optional: Track which projects are viewed the most
    const viewDetailsBtn = card.querySelector('.project-overlay a');
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener('click', function(e) {
        // You could add analytics tracking here in the future
        console.log('Project viewed:', card.querySelector('h3').textContent);
      });
    }
  });
  
  // Enhance accordion behavior
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Smooth scroll to the accordion when opened
      if (this.classList.contains('collapsed')) {
        setTimeout(() => {
          const accordionItem = this.closest('.accordion-item');
          window.scrollTo({
            top: accordionItem.offsetTop - 100,
            behavior: 'smooth'
          });
        }, 400);
      }
    });
  });
  
  // Add URL hash updates when accordion sections open
  const accordionCollapse = document.querySelectorAll('.accordion-collapse');
  
  accordionCollapse.forEach(collapse => {
    collapse.addEventListener('shown.bs.collapse', function() {
      const accordionId = this.getAttribute('id');
      // Update URL without page reload
      history.replaceState(null, null, `#${accordionId}`);
    });
  });
  
  // Add lazy loading for project images for performance
  const projectImages = document.querySelectorAll('.project-image img');
  if ('loading' in HTMLImageElement.prototype) {
    projectImages.forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    // This could be expanded with a proper lazy loading library if needed
    projectImages.forEach(img => {
      const src = img.getAttribute('src');
      img.setAttribute('data-src', src);
      img.removeAttribute('src');
      
      // Simple intersection observer
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.getAttribute('data-src');
            observer.unobserve(image);
          }
        });
      });
      
      observer.observe(img);
    });
  }
  
  // Initialize filter functionality if needed
  initializeFilters();
}

function initializeFilters() {
  // This could be expanded in the future to allow filtering projects by specific criteria
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        
        // Reset active class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter projects
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
          } else {
            if (card.classList.contains(filterValue)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }
}