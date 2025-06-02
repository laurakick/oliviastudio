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