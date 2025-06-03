/**
 * Button Components for Olivia Flower Art Studio
 * Provides reusable button components with consistent styling and behavior
 */

class ButtonComponent {
  constructor(config) {
    this.config = config;
  }

  render() {
    const button = document.createElement(this.config.tag || 'a');
    
    // Set common attributes
    if (this.config.href) button.href = this.config.href;
    if (this.config.type) button.type = this.config.type;
    if (this.config.ariaLabel) button.setAttribute('aria-label', this.config.ariaLabel);
    
    // Set classes
    button.className = this.config.className;
    
    // Set content
    button.innerHTML = this.config.content;
    
    // Add event listeners if provided
    if (this.config.onClick) {
      button.addEventListener('click', this.config.onClick);
    }
    
    return button;
  }
}

// Button Factory Functions
const ButtonFactory = {
  // Hero Button
  createHeroButton(text, href) {
    return new ButtonComponent({
      tag: 'a',
      href: href,
      className: 'hero-btn',
      content: text
    });
  },

  // Course Button
  createCourseButton(text, href) {
    return new ButtonComponent({
      tag: 'a',
      href: href,
      className: 'course-btn',
      content: text
    });
  },

  // Proposal Button
  createProposalButton(text, href) {
    return new ButtonComponent({
      tag: 'a',
      href: href,
      className: 'proposal-btn',
      content: text
    });
  },

  // Decor Button
  createDecorButton(text, href) {
    return new ButtonComponent({
      tag: 'a',
      href: href,
      className: 'decor-btn',
      content: text
    });
  },

  // Large Decor Button
  createDecorButtonLarge(text, href) {
    return new ButtonComponent({
      tag: 'a',
      href: href,
      className: 'decor-btn-large',
      content: text
    });
  },

  // Footer Button
  createFooterButton(text, type = 'submit') {
    return new ButtonComponent({
      tag: 'button',
      type: type,
      className: 'footer-btn',
      content: text
    });
  },

  // Language Button
  createLanguageButton(text, onClick) {
    return new ButtonComponent({
      tag: 'button',
      className: 'lang-btn',
      content: text,
      onClick: onClick
    });
  },

  // Currency Button
  createCurrencyButton(text, onClick) {
    return new ButtonComponent({
      tag: 'button',
      className: 'currency-btn',
      content: text,
      onClick: onClick
    });
  }
};

// Button Template System
class ButtonTemplate {
  static renderToContainer(containerSelector, buttonConfig) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error(`Container ${containerSelector} not found`);
      return;
    }
    
    const button = buttonConfig.render();
    container.appendChild(button);
    return button;
  }

  static replaceElement(selector, buttonConfig) {
    const existingElement = document.querySelector(selector);
    if (!existingElement) {
      console.error(`Element ${selector} not found`);
      return;
    }
    
    const button = buttonConfig.render();
    existingElement.parentNode.replaceChild(button, existingElement);
    return button;
  }
}

// Initialize buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeButtons();
});

function initializeButtons() {
  // Language dropdown functionality
  const langBtn = document.querySelector('.lang-btn');
  const langMenu = document.querySelector('.lang-menu');
  
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Currency dropdown functionality
  const currencyBtn = document.querySelector('.currency-btn');
  const currencyMenu = document.querySelector('.currency-menu');
  
  if (currencyBtn && currencyMenu) {
    currencyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      currencyMenu.style.display = currencyMenu.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.language-selector') && langMenu) {
      langMenu.style.display = 'none';
    }
    if (!e.target.closest('.currency-selector') && currencyMenu) {
      currencyMenu.style.display = 'none';
    }
  });
}

// Export for use in other files
window.ButtonComponent = ButtonComponent;
window.ButtonFactory = ButtonFactory;
window.ButtonTemplate = ButtonTemplate;
