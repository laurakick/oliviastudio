/**
 * Button Configuration for Index Page
 * Defines all buttons used in the main index.html page
 */

const IndexPageButtons = {
  // Header buttons
  header: {
    language: {
      type: 'language',
      content: '繁體中文 ▾',
      onClick: null // Will be handled by the dropdown system
    },
    currency: {
      type: 'currency',
      content: '$ TWD ▾',
      onClick: null // Will be handled by the dropdown system
    }
  },

  // Hero section button
  hero: {
    learnMore: {
      type: 'hero',
      content: '了解更多',
      href: '#tagline'
    }
  },

  // Course section buttons
  courses: {
    basic: {
      type: 'course',
      content: '查看詳情',
      href: 'courses.html'
    },
    business: {
      type: 'course',
      content: '查看詳情',
      href: 'business.html'
    },
    advanced: {
      type: 'course',
      content: '查看詳情',
      href: 'courses.html'
    }
  },

  // Proposal section buttons
  proposals: {
    services: {
      type: 'proposal',
      content: '了解更多',
      href: 'services.html'
    },
    gallery: {
      type: 'proposal',
      content: '進入',
      href: 'gallery.html'
    },
    portfolio: {
      type: 'proposal',
      content: '探索更多',
      href: 'portfolio.html'
    }
  },

  // Event decoration section buttons
  decoration: {
    contact: {
      type: 'decor',
      content: '聯絡我們',
      href: 'contact.html'
    },
    consultation: {
      type: 'decor-large',
      content: '立即預約諮詢',
      href: 'contact.html'
    }
  },

  // Footer button
  footer: {
    subscribe: {
      type: 'footer',
      content: '訂閱',
      tag: 'button',
      buttonType: 'submit'
    }
  }
};

// Function to create buttons from configuration
function createButtonFromConfig(config) {
  switch(config.type) {
    case 'hero':
      return ButtonFactory.createHeroButton(config.content, config.href);
    case 'course':
      return ButtonFactory.createCourseButton(config.content, config.href);
    case 'proposal':
      return ButtonFactory.createProposalButton(config.content, config.href);
    case 'decor':
      return ButtonFactory.createDecorButton(config.content, config.href);
    case 'decor-large':
      return ButtonFactory.createDecorButtonLarge(config.content, config.href);
    case 'footer':
      return ButtonFactory.createFooterButton(config.content, config.buttonType);
    case 'language':
      return ButtonFactory.createLanguageButton(config.content, config.onClick);
    case 'currency':
      return ButtonFactory.createCurrencyButton(config.content, config.onClick);
    default:
      console.error('Unknown button type:', config.type);
      return null;
  }
}

// Function to initialize all buttons on the page
function initializeIndexButtons() {
  // This function can be called to programmatically create buttons
  // if needed for dynamic content or testing
  console.log('Button configurations loaded for index page');
}

// Export configuration
window.IndexPageButtons = IndexPageButtons;
window.createButtonFromConfig = createButtonFromConfig;
