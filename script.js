document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Category Filtering --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    /* --- 2. Slideshow Lightbox --- */
    const lightbox       = document.getElementById('lightbox');
    const lightboxImg    = document.getElementById('lightbox-img');
    const lightboxClose  = document.getElementById('lightbox-close');
    const lightboxPrev   = document.getElementById('lightbox-prev');
    const lightboxNext   = document.getElementById('lightbox-next');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    let currentSlides  = [];
    let currentLabels  = [];
    let currentIndex   = 0;

    function showSlide(index) {
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = currentSlides[index];
            lightboxImg.alt = currentLabels[index] || '';
            lightboxCaption.textContent = currentLabels[index] || '';
            lightboxCounter.textContent = (index + 1) + ' / ' + currentSlides.length;
            lightboxImg.style.opacity = '1';

            // Show/hide prev-next buttons
            lightboxPrev.style.display = currentSlides.length > 1 ? 'flex' : 'none';
            lightboxNext.style.display = currentSlides.length > 1 ? 'flex' : 'none';
        }, 120);
    }

    // Open lightbox on item click
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const isAlbum = item.getAttribute('data-album') === 'true';

            if (isAlbum) {
                currentSlides = JSON.parse(item.getAttribute('data-slides'));
                currentLabels = JSON.parse(item.getAttribute('data-labels'));
            } else {
                const imgEl = item.querySelector('img');
                currentSlides = [imgEl.src];
                currentLabels = [imgEl.alt];
            }

            currentIndex = 0;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            showSlide(currentIndex);
        });
    });

    // Next slide
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentSlides.length;
        showSlide(currentIndex);
    });

    // Prev slide
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
        showSlide(currentIndex);
    });

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => { lightboxImg.src = ''; }, 400);
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % currentSlides.length; showSlide(currentIndex); }
        if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length; showSlide(currentIndex); }
    });
});
