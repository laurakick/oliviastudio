document.addEventListener('DOMContentLoaded', function() {
    const fadeInElement = document.querySelector('.caption');
    let opacity = 0;
    const interval = 30; // Interval in milliseconds
    const duration = 2000; // Total duration in milliseconds
    const fadeInRate = interval / duration;
  
    const fadeInAnimation = setInterval(() => {
      if (opacity < 1) {
        opacity += fadeInRate;
        fadeInElement.style.opacity = opacity;
      } else {
        clearInterval(fadeInAnimation);
      }
    }, interval);
  });
  