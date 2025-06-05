// Header component loader and scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    loadHeaderComponent();
});

function loadHeaderComponent() {
    // Get the header placeholder
    const headerPlaceholder = document.getElementById('header-placeholder');
    
    if (!headerPlaceholder) {
        console.warn('Header placeholder not found');
        return;
    }

    // Load header component
    fetch('header.html')
        .then(response => response.text())
        .then(headerHTML => {
            headerPlaceholder.innerHTML = headerHTML;
            
            // Set active page
            setActivePage();
            
            // Initialize scroll behavior
            initScrollBehavior();

            // Add event listener for mobile navigation toggle
            const navToggle = document.querySelector(".nav-toggle");
            const mainNav = document.querySelector(".main-nav");
            console.log("navToggle element:", navToggle);
            console.log("mainNav element:", mainNav);
            if (navToggle && mainNav) {
                navToggle.addEventListener("click", () => {
                    mainNav.classList.toggle("nav-open");
                    navToggle.classList.toggle("is-active");
                    console.log("nav-open class toggled:", mainNav.classList.contains("nav-open"));
                });
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
}

function setActivePage() {
    // Get current page name from URL
    const currentPage = getCurrentPageName();
    
    // Find and set active navigation link
    const navLinks = document.querySelectorAll('nav a[data-page]');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    // Handle different cases
    if (filename === '' || filename === 'index.html') {
        return 'index';
    }
    
    // Remove .html extension and return page name
    return filename.replace('.html', '');
}

function initScrollBehavior() {
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Pixels to scroll before logo moves

    // Check if header exists
    if (!header) {
        console.warn('Header element not found');
        return;
    }

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Listen for scroll events with throttling for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Check initial state
    handleScroll();
}

// Modern animations for new design
document.addEventListener("DOMContentLoaded", () => {
  /* Dropdown Menus for Language & Currency */
  document.addEventListener("click", (e) => {
    const langBtn = document.querySelector(".lang-btn");
    const langMenu = document.querySelector(".lang-menu");
    const currencyBtn = document.querySelector(".currency-btn");
    const currencyMenu = document.querySelector(".currency-menu");

    if (e.target.closest(".lang-btn")) {
      if (langMenu) {
        langMenu.classList.toggle("open");
        if (currencyMenu) currencyMenu.classList.remove("open");
      }
    } else if (!e.target.closest(".language-selector")) {
      if (langMenu) langMenu.classList.remove("open");
    }

    if (e.target.closest(".currency-btn")) {
      if (currencyMenu) {
        currencyMenu.classList.toggle("open");
        if (langMenu) langMenu.classList.remove("open");
      }
    } else if (!e.target.closest(".currency-selector")) {
      if (currencyMenu) currencyMenu.classList.remove("open");
    }
  });

  /* Fade-In Sections (Intersection Observer) */
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  document.querySelectorAll(".fade-in-section").forEach((section) => {
    appearOnScroll.observe(section);
  });

  /* Newsletter Form Submission */
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailField = e.target.querySelector("input[name='email']").value;
      if (!emailField || !emailField.includes("@")) {
        alert("請輸入有效的電子郵件地址");
        return;
      }
      alert("感謝您的訂閱！");
      e.target.reset();
    });
  }
});