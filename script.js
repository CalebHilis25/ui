document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.reset();
      alert('Thank you for reaching out! I will get back to you soon.');
    });
  }

  // Project filter logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  document.querySelectorAll('.project-card').forEach(card => {
    let hoverTimer = null;
    let sliderInterval = null;
    let currentSlide = 0;
    const slider = card.querySelector('.project-slider');
    const slides = slider ? slider.querySelectorAll('img') : [];

    // --- Video hover for art and gamedev cards ---
    const isArtOrGameDev = card.getAttribute('data-category') === 'art' || card.getAttribute('data-category') === 'gamedev';
    const video = card.querySelector('.project-video');
    if (isArtOrGameDev && video) {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hovering');
        video.currentTime = 0;
        video.play();
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hovering');
        video.pause();
        video.currentTime = 0;
      });
      return; // Skip slider logic for these cards
    }
    // --- End video hover ---

    function showSlider() {
      if (!slider) return;
      slider.style.display = 'flex';
      currentSlide = 0;
      slides.forEach((img, i) => img.classList.toggle('active', i === 0));
      sliderInterval = setInterval(() => {
        slides.forEach((img, i) => img.classList.toggle('active', i === currentSlide));
        currentSlide = (currentSlide + 1) % slides.length;
      }, 1000);
    }

    function hideSlider() {
      if (!slider) return;
      slider.style.display = 'none';
      slides.forEach(img => img.classList.remove('active'));
      if (sliderInterval) clearInterval(sliderInterval);
      sliderInterval = null;
    }

    card.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(showSlider, 2000);
    });
    card.addEventListener('mouseleave', () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = null;
      hideSlider();
    });
  });
});
