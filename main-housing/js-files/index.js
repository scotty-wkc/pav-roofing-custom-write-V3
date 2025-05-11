  // Show or hide the scroll-to-top button
  window.addEventListener('scroll', () => {
    const scrollButton = document.getElementById('scrollToTop');
    if (window.scrollY > 200) {
        scrollButton.classList.add('active');
    } else {
        scrollButton.classList.remove('active');
    }
});

// Scroll to top functionality
document.getElementById('scrollToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});