document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. Category Filtering --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                // If filter is "all" or matches the item's category, show it
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Optional: Add a small animation/delay here if using Flex/Grid instead of columns
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Matches CSS transition time
                }
            });
        });
    });

    /* --- 2. Lightbox (Image Enlargement) Image Loading --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgEl = item.querySelector('img');
            const imgSrc = imgEl.src;
            const imgAlt = imgEl.alt;

            lightboxImg.src = imgSrc;
            lightboxImg.alt = imgAlt;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        // Clear src after transition to prevent flicker on next open
        setTimeout(() => {
            lightboxImg.src = '';
        }, 400); 
    };

    lightboxClose.addEventListener('click', closeLightbox);

    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
