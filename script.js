// Logo scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Pixels to scroll before logo moves

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Check initial state
    handleScroll();
});