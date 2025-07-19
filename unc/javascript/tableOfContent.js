// Initialize all collapsible sections
function initializeCollapsibles() {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
        
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    
        // Initialize all as expanded
        const content = collapsible.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + 'px';
        collapsible.classList.add('active');
    });
}

// Expand a specific collapsible section
function expandCollapsible(sectionId) {
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
        const sectionHeader = targetElement.querySelector('.collapsible');
        if (sectionHeader && !sectionHeader.classList.contains('active')) {
            sectionHeader.classList.add('active');
            const content = sectionHeader.nextElementSibling;
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initializeCollapsibles);