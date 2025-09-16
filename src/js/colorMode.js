const html = document.documentElement;
const toggleBtn = document.querySelector(".color-mode");

const lightModeHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true" viewBox="0 0 24 24">
    <path fill="currentColor" d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2h.1A6.98 6.98 0 0 0 10 7m-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938A8 8 0 0 0 4 12"/>
  </svg>
  Light Mode
`;

const darkModeHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true" viewBox="0 0 24 24">
    <path fill="currentColor" d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981"/>
  </svg>
  Dark Mode
`;

// Set initial theme
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);
toggleBtn.innerHTML = savedTheme === "dark" ? darkModeHTML : lightModeHTML;

// Toggle event
toggleBtn.addEventListener("click", () => {
  const isDark = html.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggleBtn.innerHTML = newTheme === "dark" ? darkModeHTML : lightModeHTML;
});
