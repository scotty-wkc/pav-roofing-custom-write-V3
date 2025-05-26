document.addEventListener('DOMContentLoaded', () => {
  // Initialize any Bootstrap components that require JS
  var accordionItems = document.querySelectorAll('.accordion-button');
  
  // Smooth scroll for "Our Process" anchor link
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              // Offset for fixed header
              const headerOffset = 100;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Add animation to process steps when they come into view
  const processSteps = document.querySelectorAll('.process-step');
  
  // Create the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              // Stop observing after animation is added
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.2 });
  
  // Observe each process step
  processSteps.forEach(step => {
      observer.observe(step);
  });
  
  // Optional: Add hover effect on material cards to enhance user experience
  const materialCards = document.querySelectorAll('.material-card');
  materialCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px)';
          this.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
      });
  });
  
  // Optional: Enhance the FAQ section with custom open/close animations
  accordionItems.forEach(item => {
      item.addEventListener('click', function() {
          // Add a slight delay to the focus change
          setTimeout(() => {
              const isOpen = !this.classList.contains('collapsed');
              if (isOpen) {
                  this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
          }, 400);
      });
  });
});