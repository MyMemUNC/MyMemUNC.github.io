document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('language-switch');
    
    // Set initial button text based on current language
    const currentPath = window.location.pathname;
    const isChinese = currentPath.includes('/ZH/');
    languageBtn.textContent = isChinese ? 'EN' : 'ZH';
    
    languageBtn.addEventListener('click', function() {
        // Get current path
        const currentPath = window.location.pathname;
        
        // Determine new language and path
        let newPath;
        if (currentPath.includes('/ZH/')) {
            // Switch to English
            newPath = currentPath.replace('/ZH/', '/EN/');
            languageBtn.textContent = 'ZH'; // Update button for next click
        } else {
            // Switch to Chinese
            newPath = currentPath.replace('/EN/', '/ZH/');
            languageBtn.textContent = 'EN'; // Update button for next click
        }
        
        // Navigate to the new language version
        window.location.href = newPath;
    });
});