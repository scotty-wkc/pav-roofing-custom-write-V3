// document.addEventListener("DOMContentLoaded", () => {
//   fetch("./html-files/footer.html")
//     .then((response) => response.text())
//     .then((data) => {
//       document.getElementById("footer-placeholder").innerHTML = data;
//     })
//     .catch((error) => console.error("Error loading footer:", error));
// });


document.addEventListener("DOMContentLoaded", () => {
  const footerPlaceholder = document.getElementById("footer-placeholder");

  if (footerPlaceholder) {
    // For GitHub Pages, include the repository name in the path
    fetch("/html-files/footer.html")
      .then(response => {
        if (!response.ok) {
          // Try a relative path as fallback
          return fetch("./html-files/footer.html");
        }
        return response;
      })
      .then(response => {
        if (!response.ok) {
          // Try another relative path as a secondary fallback
          return fetch("../html-files/footer.html");
        }
        return response;
      })
      .then(response => {
        if (!response.ok) {
          // Try another relative path as a secondary fallback
          return fetch("../../html-files/footer.html");
        }
        return response;
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load footer (status ${response.status})`);
        }
        return response.text();
      })
      .then(data => {
        footerPlaceholder.innerHTML = data;
        
        // Dispatch a custom event to notify other scripts that the navbar is loaded
        document.dispatchEvent(new CustomEvent('footerLoaded'));
      })
      .catch(error => {
        console.error("Error loading footer:", error);
        footerPlaceholder.innerHTML = `
          <div style="background-color: #1a202c; color: white; padding: 20px; text-align: center;">
            Error loading footer. Check console for details.
          </div>
        `;
      });

  }
});