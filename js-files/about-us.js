// About Us Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll to top functionality
  window.addEventListener('scroll', function() {
      const scrollToTopButton = document.getElementById('scrollToTop');
      if (window.pageYOffset > 300) {
          scrollToTopButton.classList.add('active');
      } else {
          scrollToTopButton.classList.remove('active');
      }
  });

  document.getElementById('scrollToTop').addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Add animation to value cards on scroll
  const observerOptions = {
      threshold: 0.2
  };

  const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  // Observe all value cards, team members and certification items
  document.querySelectorAll('.value-card, .team-member, .certification-item').forEach(el => {
      observer.observe(el);
  });

  // Enhance team member hover effects
  document.querySelectorAll('.team-member').forEach(member => {
      member.addEventListener('mouseenter', function() {
          this.querySelector('.team-img').style.transform = 'scale(1.05)';
      });
      
      member.addEventListener('mouseleave', function() {
          this.querySelector('.team-img').style.transform = 'scale(1)';
      });
  });
});