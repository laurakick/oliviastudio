class NavigationComponent {
  constructor() {
    this.template = `
      <header class="site-header fade-in-section">
        <div class="logo-container">
          <a href="index.html" class="logo">
            <img src="image/olivia_logo2.png" alt="Olivia花藝工作室 Logo" />
            <span class="logo-text">奧莉花藝</span>
          </a>
        </div>
        <nav class="main-nav">
          <ul class="nav-list">
            <li><a href="about.html">關於</a></li>
            <li><a href="courses.html">課程</a></li>
            <li><a href="services.html">花藝設計</a></li>
            <li><a href="portfolio.html">活動佈置</a></li>
            <li><a href="contact.html">聯絡</a></li>
          </ul>
        </nav>
        <div class="header-controls">
          <button class="nav-toggle" aria-label="Toggle navigation">
            <span class="hamburger"></span>
          </button>
        </div>
      </header>
    `;
  }

  render(containerId = 'navigation-container') {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = this.template;
      this.attachEventListeners();
    }
  }

  attachEventListeners() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");
    if (navToggle && mainNav) {
      navToggle.addEventListener("click", () => {
        mainNav.classList.toggle("nav-open");
        navToggle.classList.toggle("is-active");
      });
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const navigation = new NavigationComponent();
  navigation.render();
});
