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
            <li>
              <a href="about.html">關於我們</a>
              <ul style="display:none" class="submenu">
                <li><a href="about.html#brand-story">品牌故事</a></li>
                <li><a href="about.html#founder">創辦人介紹</a></li>
              </ul>
            </li>
            <li><a href="courses.html">課程</a></li>
            <li><a href="services.html">專業花藝設計</a></li>
            <li><a href="portfolio.html">活動餐會佈置</a></li>
            <li><a href="contact.html">聯絡我們</a></li>
          </ul>
        </nav>
        <div class="header-controls">
          <div style="display:none" class="language-selector">
            <button class="lang-btn" data-button-component="language" data-button-id="header-language">繁體中文 ▾</button>
            <ul  class="lang-menu">
              <li><a href="?lang=en">English</a></li>
              <li><a href="?lang=zh-TW">繁體中文</a></li>
            </ul>
          </div>
          <div style="display:none" class="currency-selector">
            <button class="currency-btn" data-button-component="currency" data-button-id="header-currency">$ TWD ▾</button>
            <ul class="currency-menu">
              <li><a href="?currency=USD">$ USD</a></li>
              <li><a href="?currency=TWD">$ TWD</a></li>
            </ul>
          </div>
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

    // Dropdown Menus for Language & Currency
    document.addEventListener("click", (e) => {
      const langBtn = document.querySelector(".lang-btn");
      const langMenu = document.querySelector(".lang-menu");
      const currencyBtn = document.querySelector(".currency-btn");
      const currencyMenu = document.querySelector(".currency-menu");

      if (e.target.closest(".lang-btn")) {
        langMenu.classList.toggle("open");
        if (currencyMenu) currencyMenu.classList.remove("open");
      } else if (!e.target.closest(".language-selector")) {
        if (langMenu) langMenu.classList.remove("open");
      }

      if (e.target.closest(".currency-btn")) {
        currencyMenu.classList.toggle("open");
        if (langMenu) langMenu.classList.remove("open");
      } else if (!e.target.closest(".currency-selector")) {
        if (currencyMenu) currencyMenu.classList.remove("open");
      }
    });
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const navigation = new NavigationComponent();
  navigation.render();
});
