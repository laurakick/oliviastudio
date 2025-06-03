// Quick verification script for button components
// This can be run in the browser console

console.log('🌸 Botanical Button System - Quick Check');
console.log('=====================================');

// Check if all components are loaded
const components = {
  'ButtonComponent': window.ButtonComponent,
  'ButtonFactory': window.ButtonFactory,
  'ButtonManager': window.ButtonManager,
  'buttonManager': window.buttonManager,
  'IndexPageButtons': window.IndexPageButtons
};

console.log('📦 Component Status:');
Object.entries(components).forEach(([name, component]) => {
  console.log(`  ${component ? '✅' : '❌'} ${name}`);
});

// Check button count
if (window.buttonManager) {
  setTimeout(() => {
    const buttonCount = window.buttonManager.buttons ? window.buttonManager.buttons.size : 0;
    console.log(`\n🔘 Discovered Buttons: ${buttonCount}`);
    
    if (buttonCount > 0) {
      console.log('📍 Button Types Found:');
      const types = {};
      window.buttonManager.buttons.forEach(btn => {
        types[btn.type] = (types[btn.type] || 0) + 1;
      });
      Object.entries(types).forEach(([type, count]) => {
        console.log(`  • ${type}: ${count} buttons`);
      });
    }
  }, 1000);
} else {
  console.log('❌ Button Manager not found');
}

// Check for botanical decorations
console.log('\n🌿 Botanical Decorations:');
const buttonsWithDecorations = document.querySelectorAll(`
  .hero-btn::before,
  .course-btn::before,
  .proposal-btn::before,
  .decor-btn::before,
  .decor-btn-large::before,
  .footer-btn::before,
  .lang-btn::before,
  .currency-btn::before
`);

console.log(`  🎨 CSS Decorations Applied: ${buttonsWithDecorations.length > 0 ? 'Yes' : 'Check CSS'}`);

console.log('\n💡 Try these commands:');
console.log('  • ButtonTests.demo()');
console.log('  • buttonManager.debug()');
console.log('  • ButtonTests.runAllTests()');
console.log('  • buttonManager.exportAnalytics()');

console.log('\n🌸 Open browser DevTools and hover over buttons to see botanical animations!');
