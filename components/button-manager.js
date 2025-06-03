/**
 * Button Manager
 * Centralized management system for all button components
 */

class ButtonManager {
  constructor() {
    this.buttons = new Map();
    this.analytics = {
      clicks: new Map(),
      impressions: new Map()
    };
    this.initialized = false;
  }

  // Initialize the button manager
  init() {
    if (this.initialized) return;
    
    this.scanButtons();
    this.attachEventListeners();
    this.setupAnalytics();
    this.initialized = true;
    
    console.log(`ButtonManager initialized with ${this.buttons.size} buttons`);
  }

  // Scan the DOM for button components
  scanButtons() {
    const buttonElements = document.querySelectorAll('[data-button-component]');
    
    buttonElements.forEach(element => {
      const componentType = element.getAttribute('data-button-component');
      const buttonId = element.getAttribute('data-button-id');
      
      if (buttonId) {
        this.buttons.set(buttonId, {
          element: element,
          type: componentType,
          id: buttonId,
          text: element.textContent.trim(),
          href: element.href || null,
          created: new Date()
        });
      }
    });
  }

  // Attach event listeners to all buttons
  attachEventListeners() {
    this.buttons.forEach((button, id) => {
      // Track clicks
      button.element.addEventListener('click', (e) => {
        this.trackClick(id, e);
      });

      // Track impressions (when button comes into view)
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.trackImpression(id);
              observer.unobserve(entry.target);
            }
          });
        });
        observer.observe(button.element);
      }
    });
  }

  // Setup analytics tracking
  setupAnalytics() {
    this.buttons.forEach((button, id) => {
      this.analytics.clicks.set(id, 0);
      this.analytics.impressions.set(id, 0);
    });
  }

  // Track button clicks
  trackClick(buttonId, event) {
    const currentClicks = this.analytics.clicks.get(buttonId) || 0;
    this.analytics.clicks.set(buttonId, currentClicks + 1);
    
    const button = this.buttons.get(buttonId);
    console.log(`Button clicked: ${buttonId} (${button.text}) - Total clicks: ${currentClicks + 1}`);
    
    // Custom event for external tracking
    document.dispatchEvent(new CustomEvent('buttonClick', {
      detail: {
        buttonId,
        button,
        event,
        totalClicks: currentClicks + 1
      }
    }));
  }

  // Track button impressions
  trackImpression(buttonId) {
    const currentImpressions = this.analytics.impressions.get(buttonId) || 0;
    this.analytics.impressions.set(buttonId, currentImpressions + 1);
    
    console.log(`Button impression: ${buttonId} - Total impressions: ${currentImpressions + 1}`);
  }

  // Get button by ID
  getButton(buttonId) {
    return this.buttons.get(buttonId);
  }

  // Get all buttons of a specific type
  getButtonsByType(type) {
    return Array.from(this.buttons.values()).filter(button => button.type === type);
  }

  // Get analytics for a button
  getButtonAnalytics(buttonId) {
    return {
      clicks: this.analytics.clicks.get(buttonId) || 0,
      impressions: this.analytics.impressions.get(buttonId) || 0
    };
  }

  // Get all analytics
  getAllAnalytics() {
    const analytics = {};
    this.buttons.forEach((button, id) => {
      analytics[id] = {
        ...button,
        clicks: this.analytics.clicks.get(id) || 0,
        impressions: this.analytics.impressions.get(id) || 0
      };
    });
    return analytics;
  }

  // Update button text
  updateButtonText(buttonId, newText) {
    const button = this.buttons.get(buttonId);
    if (button) {
      button.element.textContent = newText;
      button.text = newText;
      console.log(`Updated button ${buttonId} text to: ${newText}`);
    }
  }

  // Update button href
  updateButtonHref(buttonId, newHref) {
    const button = this.buttons.get(buttonId);
    if (button && button.element.href !== undefined) {
      button.element.href = newHref;
      button.href = newHref;
      console.log(`Updated button ${buttonId} href to: ${newHref}`);
    }
  }

  // Add a new button programmatically
  addButton(buttonId, config) {
    const button = createButtonFromConfig(config);
    if (button) {
      const element = button.render();
      element.setAttribute('data-button-component', config.type);
      element.setAttribute('data-button-id', buttonId);
      
      this.buttons.set(buttonId, {
        element: element,
        type: config.type,
        id: buttonId,
        text: config.content,
        href: config.href || null,
        created: new Date()
      });
      
      // Setup analytics for new button
      this.analytics.clicks.set(buttonId, 0);
      this.analytics.impressions.set(buttonId, 0);
      
      // Attach event listeners
      element.addEventListener('click', (e) => {
        this.trackClick(buttonId, e);
      });
      
      return element;
    }
    return null;
  }

  // Remove a button
  removeButton(buttonId) {
    const button = this.buttons.get(buttonId);
    if (button) {
      button.element.remove();
      this.buttons.delete(buttonId);
      this.analytics.clicks.delete(buttonId);
      this.analytics.impressions.delete(buttonId);
      console.log(`Removed button: ${buttonId}`);
    }
  }

  // Export analytics data
  exportAnalytics() {
    const data = this.getAllAnalytics();
    const json = JSON.stringify(data, null, 2);
    console.log('Button Analytics Export:', json);
    return json;
  }

  // Debug information
  debug() {
    console.group('ButtonManager Debug Info');
    console.log('Total buttons:', this.buttons.size);
    console.log('Buttons by type:');
    
    const typeGroups = {};
    this.buttons.forEach(button => {
      if (!typeGroups[button.type]) {
        typeGroups[button.type] = [];
      }
      typeGroups[button.type].push(button.id);
    });
    
    Object.entries(typeGroups).forEach(([type, ids]) => {
      console.log(`  ${type}: ${ids.length} buttons`, ids);
    });
    
    console.log('Analytics summary:');
    console.log('  Total clicks:', Array.from(this.analytics.clicks.values()).reduce((a, b) => a + b, 0));
    console.log('  Total impressions:', Array.from(this.analytics.impressions.values()).reduce((a, b) => a + b, 0));
    
    console.groupEnd();
  }
}

// Create global instance
const buttonManager = new ButtonManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    buttonManager.init();
  }, 100); // Small delay to ensure all scripts are loaded
});

// Export for global use
window.ButtonManager = ButtonManager;
window.buttonManager = buttonManager;
