(function () {
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsHost = document.querySelector('[data-dots]');

    if (slides.length && prevBtn && nextBtn && dotsHost) {
      let current = slides.findIndex((slide) => slide.classList.contains('is-active'));
      if (current < 0) {
        current = 0;
        slides[0].classList.add('is-active');
      }

      const dots = slides.map((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => setSlide(index));
        dotsHost.appendChild(dot);
        return dot;
      });

      const updateDots = () => {
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === current);
        });
      };

      const setSlide = (index) => {
        slides[current].classList.remove('is-active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('is-active');
        updateDots();
      };

      const next = () => setSlide(current + 1);
      const prev = () => setSlide(current - 1);

      nextBtn.addEventListener('click', next);
      prevBtn.addEventListener('click', prev);

      let autoPlay = window.setInterval(next, 5000);

      const stopAutoPlay = () => {
        window.clearInterval(autoPlay);
      };

      const startAutoPlay = () => {
        stopAutoPlay();
        autoPlay = window.setInterval(next, 5000);
      };

      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
      carousel.addEventListener('focusin', stopAutoPlay);
      carousel.addEventListener('focusout', startAutoPlay);

      updateDots();
    }
  }

  const revealItems = document.querySelectorAll('.reveal');
  if (!revealItems.length || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
})();
