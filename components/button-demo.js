/**
 * Button Components Demo
 * Shows how to use the button components system
 */

// Example usage of the button components

// 1. Creating buttons programmatically
function demoButtonCreation() {
  // Create a hero button
  const heroBtn = ButtonFactory.createHeroButton('了解更多', '#tagline');
  
  // Create a course button
  const courseBtn = ButtonFactory.createCourseButton('查看詳情', 'courses.html');
  
  // Create a proposal button
  const proposalBtn = ButtonFactory.createProposalButton('進入', 'gallery.html');
  
  // Render buttons to containers
  const demoContainer = document.getElementById('button-demo');
  if (demoContainer) {
    demoContainer.appendChild(heroBtn.render());
    demoContainer.appendChild(courseBtn.render());
    demoContainer.appendChild(proposalBtn.render());
  }
}

// 2. Using configuration-based approach
function demoConfigButtons() {
  const configs = [
    IndexPageButtons.hero.learnMore,
    IndexPageButtons.courses.basic,
    IndexPageButtons.proposals.gallery
  ];
  
  configs.forEach(config => {
    const button = createButtonFromConfig(config);
    if (button) {
      console.log('Created button:', config.content);
      // ButtonTemplate.renderToContainer('#demo-container', button);
    }
  });
}

// 3. Replacing existing buttons
function demoButtonReplacement() {
  // Replace an existing button with a component-generated one
  const newHeroBtn = ButtonFactory.createHeroButton('了解更多', '#tagline');
  ButtonTemplate.replaceElement('.hero-btn', newHeroBtn);
}

// 4. Dynamic button creation
function createDynamicButton(type, text, href) {
  const config = {
    type: type,
    content: text,
    href: href
  };
  
  return createButtonFromConfig(config);
}

// Usage examples:
// const myButton = createDynamicButton('course', '新課程', 'new-course.html');
// ButtonTemplate.renderToContainer('#my-container', myButton);

console.log('Button demo utilities loaded');
