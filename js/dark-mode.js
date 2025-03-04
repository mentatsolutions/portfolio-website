/**
 * Dark Mode Toggle JavaScript for Portfolio Website
 * Author: Wendell White
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Apply saved theme preference
        body.classList.toggle('dark-mode', savedTheme === 'dark');
    } else {
        // Check if user's system prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.toggle('dark-mode', prefersDarkMode);
        
        // Save the initial theme preference
        localStorage.setItem('theme', prefersDarkMode ? 'dark' : 'light');
    }
    
    // Update button icon based on current theme
    updateThemeToggleIcon();
    
    // Theme Toggle Event Listener
    themeToggleBtn.addEventListener('click', function() {
        // Toggle dark mode class on body
        body.classList.toggle('dark-mode');
        
        // Update localStorage with new theme preference
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Update button icon
        updateThemeToggleIcon();
        
        // Optional: Add animation effect for theme change
        addThemeChangeAnimation();
    });
    
    // Helper function to update theme toggle icon
    function updateThemeToggleIcon() {
        const isDarkMode = body.classList.contains('dark-mode');
        const icons = themeToggleBtn.querySelectorAll('.icon');
        const moonIcon = icons[0]; // First icon is moon
        const sunIcon = icons[1];  // Second icon is sun
        
        if (isDarkMode) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline-block';
        } else {
            moonIcon.style.display = 'inline-block';
            sunIcon.style.display = 'none';
        }
    }
    
    // Helper function to add a subtle animation when changing themes
    function addThemeChangeAnimation() {
        // Create and append a temporary overlay for transition effect
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        overlay.style.zIndex = '9999';
        overlay.style.pointerEvents = 'none';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(overlay);
        
        // Trigger animation
        setTimeout(() => {
            overlay.style.opacity = '0.5';
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            }, 200);
        }, 0);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            body.classList.toggle('dark-mode', e.matches);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleIcon();
        }
    });
});
