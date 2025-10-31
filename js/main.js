// --- Animated Theme Switch ---
const THEMES = ["light", "dark"];
const themeIcons = ["🌞", "🌚"];
let themeIndex = 0;

// Restore last theme if present
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme and icon
  const iconSpan = document.getElementById("theme-icon");
  const savedTheme = localStorage.getItem("color-theme");
  if (savedTheme && THEMES.includes(savedTheme)) {
    document.documentElement.setAttribute("data-color-scheme", savedTheme);
    themeIndex = THEMES.indexOf(savedTheme);
    if (iconSpan) iconSpan.textContent = themeIcons[themeIndex];
  } else {
    document.documentElement.setAttribute("data-color-scheme", "light");
    if (iconSpan) iconSpan.textContent = themeIcons[0];
  }

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.add("theme-switching");
      setTimeout(() => document.body.classList.remove("theme-switching"), 500);
      // Switch theme
      themeIndex = (themeIndex + 1) % THEMES.length;
      document.documentElement.setAttribute(
        "data-color-scheme",
        THEMES[themeIndex]
      );
      localStorage.setItem("color-theme", THEMES[themeIndex]);
      if (iconSpan) iconSpan.textContent = themeIcons[themeIndex];
    });
  }

  // --- Page Load/Animation code (your original) ---
  initializePageAnimations();
  initializeInteractions();
  loadExternalLinks();
});

// --- Animations and Interactions ---
function initializePageAnimations() {
  document.body.classList.add("page-loaded");
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
}

function initializeInteractions() {
  // Project card hover
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
  // GitHub link hover
  document.querySelectorAll(".github-link").forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-6px)";
    });
    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
  // Skill item hover
  document.querySelectorAll(".skill-item").forEach((skill) => {
    skill.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-6px) scale(1.05)";
    });
    skill.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
  // Nav ripple on click
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.background = "rgba(255,255,255,0.5)";
      ripple.style.borderRadius = "50%";
      ripple.style.left = e.clientX - rect.left + "px";
      ripple.style.top = e.clientY - rect.top + "px";
      ripple.style.pointerEvents = "none";
      ripple.style.animation = "ripple 0.6s ease-out";
      this.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

// --- External Links and Enhancements ---
function loadExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
    // Optionally add an external icon
  });
}

// --- On Load: Scroll, Quotes, Keyboard, Lazy Images, etc. ---
window.addEventListener("load", function () {
  initializeScrollAnimations();
  initializeQuotes();
  initializeKeyboardNavigation();
  initializeLazyLoading();
});

function initializeScrollAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-on-scroll");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const animatableElements = document.querySelectorAll(
    ".project-card, .skill-item, .github-link, .project-detail, .contact-info li"
  );
  animatableElements.forEach((el) => observer.observe(el));
}

function initializeQuotes() {
  const quotes = [
    "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
  ];
  const quoteElements = document.querySelectorAll(".quote");
  if (quoteElements.length > 0) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElements.forEach((el) => {
      el.textContent = randomQuote;
    });
  }
}

function initializeKeyboardNavigation() {
  document.addEventListener("keydown", function (e) {
    if (e.altKey && e.key === "g")
      window.location.href = "https://github.com/MdAsifInIT";
    if (e.altKey && e.key === "l")
      window.location.href = "https://linktr.ee/mdasifinit";
    if (e.altKey && e.key === "h") window.location.href = "/";
  });
}

function initializeLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    });
    document
      .querySelectorAll("img[data-src]")
      .forEach((img) => imageObserver.observe(img));
  }
}

// --- Page Utility Example ---
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Add ripple keyframes (required for navigation ripple effect)
const style = document.createElement("style");
style.textContent = `
@keyframes ripple {
  from { width: 20px; height: 20px; opacity: 1; }
  to { width: 300px; height: 300px; opacity: 0; }
}
.animate-on-scroll { animation: fadeInUp 0.8s ease-out forwards; }
body.page-loaded { opacity: 1; }
`;
document.head.appendChild(style);
