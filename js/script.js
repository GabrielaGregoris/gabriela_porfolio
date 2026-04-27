// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href');
        var target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    // 1. Target all relevant case study images
    const projectImages = document.querySelectorAll(`
        .case-image img, 
        .hr-z-image img, 
        .hr-comparison-item img, 
        .wl-image-container img, 
        .kw-showcase-image img, 
        .work-image img, 
        .work-image-collage img
    `);

    // If no project images exist on this page, exit early (e.g. on homepage)
    if (projectImages.length === 0) return;

    // 2. Create and inject the Lightbox HTML structure
    const lightboxHTML = `
        <div class="lightbox-overlay" id="lightboxOverlay">
            <div class="lightbox-close" id="lightboxClose">&times;</div>
            <img class="lightbox-image" id="lightboxImage" src="" alt="Full size view">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const overlay = document.getElementById('lightboxOverlay');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');

    // 3. Add interactions to images
    projectImages.forEach(img => {
        // Add visual cue CSS class
        img.classList.add('lightbox-trigger');

        img.addEventListener('click', function() {
            // Set the high-res source (uses current src by default)
            lightboxImage.src = this.src;
            
            // Show overlay and lock background scrolling
            overlay.classList.add('active');
            document.body.classList.add('lightbox-open');
        });
    });

    // 4. Close logic
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        
        // Clear src after fade out to prevent visual snapping
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    }

    // Close on 'X' click
    closeBtn.addEventListener('click', closeLightbox);

    // Close on overlay background click (only if clicking the overlay, not the image itself)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeLightbox();
        }
    });

    // Close on 'Escape' key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
});
