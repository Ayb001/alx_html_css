// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu function
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navigation.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Close menu function
    function closeMenu() {
        menuToggle.classList.remove('active');
        navigation.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Event listener for hamburger button
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu when clicking outside of it
    document.addEventListener('click', function(e) {
        if (!navigation.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on window resize if screen becomes larger than mobile
    window.addEventListener('resize', function() {
        if (window.innerWidth > 480) {
            closeMenu();
        }
    });
    
    // Prevent scroll when menu is open
    function preventScroll(e) {
        e.preventDefault();
    }
    
    // Listen for menu state changes to control body scroll
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isMenuOpen = document.body.classList.contains('menu-open');
                if (isMenuOpen) {
                    document.addEventListener('touchmove', preventScroll, { passive: false });
                } else {
                    document.removeEventListener('touchmove', preventScroll);
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            closeMenu();
        });
    });
});