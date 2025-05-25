document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  if (navbarPlaceholder) {
    // For GitHub Pages, include the repository name in the path
    fetch("/html-files/nav.html")
      .then(response => {
        if (!response.ok) {
          // Try a relative path as fallback
          return fetch("./html-files/nav.html");
        }
        return response;
      })
      .then(response => {
        if (!response.ok) {
          // Try another relative path as a secondary fallback
          return fetch("../html-files/nav.html");
        }
        return response;
      })
      .then(response => {
        if (!response.ok) {
          // Try another relative path as a secondary fallback
          return fetch("../../html-files/nav.html");
        }
        return response;
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load navbar (status ${response.status})`);
        }
        return response.text();
      })
      .then(data => {
        navbarPlaceholder.innerHTML = data;

        // Highlight the active link
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

        navLinks.forEach(link => {
          if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });

        // Dispatch a custom event to notify other scripts that the navbar is loaded
        document.dispatchEvent(new CustomEvent('navbarLoaded'));
      })
      .catch(error => {
        console.error("Error loading navbar:", error);
        navbarPlaceholder.innerHTML = `
          <div style="background-color: #1a202c; color: white; padding: 20px; text-align: center;">
            Error loading navbar. Check console for details.
          </div>
        `;
      });
  }
});