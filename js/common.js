// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
        const themeIcon = toggleBtn.querySelector('i');
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });
    }

    // Flashing name functionality
    const nameElement = document.getElementById('dynamic-name');
    if (nameElement) {
        const names = ["lavafoxerex", "MyMem"];
        let currentIndex = 0;
        
        function changeName() {
            nameElement.style.opacity = 0;
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % names.length;
                nameElement.textContent = names[currentIndex];
                nameElement.style.opacity = 1;
            }, 300);
        }
        
        // Initialize with the longer name to set proper width
        nameElement.textContent = "lavafoxerex";
        setInterval(changeName, 1500);
    }
});