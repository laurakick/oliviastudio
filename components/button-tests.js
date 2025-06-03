/**
 * Button Component System Tests
 * Simple tests to validate the button component system
 */

// Test functions that can be run in the browser console
window.ButtonTests = {
  
  // Test 1: Verify all buttons are discovered
  testButtonDiscovery() {
    console.log('🧪 Testing Button Discovery...');
    const buttonCount = buttonManager.buttons.size;
    console.log(`Found ${buttonCount} buttons`);
    
    if (buttonCount > 0) {
      console.log('✅ Button discovery working');
      return true;
    } else {
      console.log('❌ No buttons discovered');
      return false;
    }
  },

  // Test 2: Test button creation
  testButtonCreation() {
    console.log('🧪 Testing Button Creation...');
    
    try {
      const heroBtn = ButtonFactory.createHeroButton('Test Button', '#test');
      const element = heroBtn.render();
      
      if (element && element.tagName === 'A' && element.classList.contains('hero-btn')) {
        console.log('✅ Button creation working');
        return true;
      } else {
        console.log('❌ Button creation failed');
        return false;
      }
    } catch (error) {
      console.log('❌ Button creation error:', error);
      return false;
    }
  },

  // Test 3: Test configuration system
  testConfiguration() {
    console.log('🧪 Testing Configuration System...');
    
    try {
      const config = IndexPageButtons.hero.learnMore;
      const button = createButtonFromConfig(config);
      
      if (button && config.content && config.href) {
        console.log('✅ Configuration system working');
        return true;
      } else {
        console.log('❌ Configuration system failed');
        return false;
      }
    } catch (error) {
      console.log('❌ Configuration error:', error);
      return false;
    }
  },

  // Test 4: Test analytics
  testAnalytics() {
    console.log('🧪 Testing Analytics...');
    
    const analytics = buttonManager.getAllAnalytics();
    
    if (typeof analytics === 'object' && Object.keys(analytics).length > 0) {
      console.log('✅ Analytics system working');
      console.log(`Tracking ${Object.keys(analytics).length} buttons`);
      return true;
    } else {
      console.log('❌ Analytics system failed');
      return false;
    }
  },

  // Test 5: Test button management
  testButtonManagement() {
    console.log('🧪 Testing Button Management...');
    
    try {
      // Test getting a button
      const buttons = Array.from(buttonManager.buttons.keys());
      if (buttons.length > 0) {
        const firstButton = buttonManager.getButton(buttons[0]);
        
        if (firstButton && firstButton.element) {
          console.log('✅ Button management working');
          return true;
        }
      }
      
      console.log('❌ Button management failed');
      return false;
    } catch (error) {
      console.log('❌ Button management error:', error);
      return false;
    }
  },

  // Run all tests
  runAllTests() {
    console.log('🚀 Running Button Component System Tests...');
    console.log('==========================================');
    
    const tests = [
      this.testButtonDiscovery,
      this.testButtonCreation,
      this.testConfiguration,
      this.testAnalytics,
      this.testButtonManagement
    ];
    
    let passed = 0;
    let total = tests.length;
    
    tests.forEach(test => {
      if (test.call(this)) {
        passed++;
      }
    });
    
    console.log('==========================================');
    console.log(`📊 Test Results: ${passed}/${total} tests passed`);
    
    if (passed === total) {
      console.log('🎉 All tests passed! Button system is working correctly.');
    } else {
      console.log('⚠️ Some tests failed. Check the button system setup.');
    }
    
    return passed === total;
  },

  // Demo function
  demo() {
    console.log('🎭 Button System Demo');
    console.log('=====================');
    
    // Show available buttons
    console.log('Available buttons:');
    buttonManager.buttons.forEach((button, id) => {
      console.log(`- ${id}: ${button.text} (${button.type})`);
    });
    
    // Show analytics
    console.log('\nButton Analytics:');
    const analytics = buttonManager.getAllAnalytics();
    Object.entries(analytics).forEach(([id, data]) => {
      console.log(`- ${id}: ${data.clicks} clicks, ${data.impressions} impressions`);
    });
    
    console.log('\nTry these commands:');
    console.log('- ButtonTests.runAllTests()');
    console.log('- buttonManager.debug()');
    console.log('- buttonManager.getButtonsByType("course")');
    console.log('- buttonManager.updateButtonText("hero-learn-more", "New Text")');
  }
};

// Auto-run demo when page loads (with delay to ensure everything is initialized)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    console.log('🔧 Button Component System loaded');
    console.log('Run ButtonTests.demo() to see available commands');
  }, 500);
});
