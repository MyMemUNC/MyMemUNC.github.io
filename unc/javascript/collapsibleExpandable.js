function initializeTableOfContents() {
    // Get header height for offset calculation
    const header = document.querySelector('.page-header');
    const headerHeight = header.offsetHeight;

    // Fix for TOC highlighting
    const tocLinks = document.querySelectorAll('.toc a');

    // Click handler for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;

            // Remove active class from all links
            tocLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Check if this is a collapsible section
            const sectionHeader = targetElement.querySelector('.collapsible');
            if (sectionHeader && !sectionHeader.classList.contains('active')) {
                // First expand the section
                sectionHeader.classList.add('active');
                const content = sectionHeader.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // Wait for the expansion to complete (100ms buffer)
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            // Then scroll to the section title
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Scroll handler for section highlighting
    const sections = document.querySelectorAll('.content-section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + headerHeight + 20;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Reset scroll position on page load
// window.onbeforeunload = function() {
//     window.scrollTo(0, 0);
// };

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initializeTableOfContents);