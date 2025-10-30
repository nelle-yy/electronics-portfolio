// Gallery Carousel and Lightbox
(function() {
    'use strict';

    // Initialize all carousels on page load
    function initGalleries() {
        var galleries = document.querySelectorAll('.gallery .carousel');
        
        galleries.forEach(function(carousel) {
            initCarousel(carousel);
        });
        
        // Create lightbox
        createLightbox();
    }

    // Initialize individual carousel
    function initCarousel(carousel) {
        var slides = carousel.querySelector('.slides');
        var slideElements = carousel.querySelectorAll('.slide');
        var prevBtn = carousel.querySelector('.prev');
        var nextBtn = carousel.querySelector('.next');
        var currentIndex = 0;
        var totalSlides = slideElements.length;

        // Hide navigation if only one slide
        if (totalSlides <= 1) {
            if (prevBtn) prevBtn.classList.add('hidden');
            if (nextBtn) nextBtn.classList.add('hidden');
        }

        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlide();
            });
        }

        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlide();
            });
        }

        // Update slide position
        function updateSlide() {
            var offset = -currentIndex * 100;
            slides.style.transform = 'translateX(' + offset + '%)';
        }

        // Click to open lightbox
        slideElements.forEach(function(slide) {
            var img = slide.querySelector('img');
            if (img) {
                img.addEventListener('click', function() {
                    openLightbox(img.src);
                });
            }
        });
    }

    // Create lightbox overlay
    function createLightbox() {
        if (document.querySelector('.lightbox')) return;

        var lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<button class="close" aria-label="Close">&times;</button><img src="" alt="Full size image">';
        document.body.appendChild(lightbox);

        var closeBtn = lightbox.querySelector('.close');
        var lightboxImg = lightbox.querySelector('img');

        // Close on button click
        closeBtn.addEventListener('click', function() {
            closeLightbox();
        });

        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // Open lightbox with image
    function openLightbox(src) {
        var lightbox = document.querySelector('.lightbox');
        var lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        var lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleries);
    } else {
        initGalleries();
    }

})();
