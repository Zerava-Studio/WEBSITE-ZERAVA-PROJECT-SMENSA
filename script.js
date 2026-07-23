/* =============================================
   ZERAVA STUDIO — script.js (optimized)
   ============================================= */

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---------- HERO SLIDER ---------- */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let sliderTimer;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startSliderTimer() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
}

document.getElementById('sliderNext').addEventListener('click', () => {
  goToSlide(currentSlide + 1);
  startSliderTimer();
});
document.getElementById('sliderPrev').addEventListener('click', () => {
  goToSlide(currentSlide - 1);
  startSliderTimer();
});
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.index));
    startSliderTimer();
  });
});
startSliderTimer();

/* ---------- BTS SWIPER ---------- */
const btsSwiper = document.getElementById('btsSwiper');
const btsSlides = btsSwiper.querySelectorAll('.bts-slide');
let btsIndex = 0;
const btsVisible = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

function updateBts() {
  const slideW = btsSlides[0].offsetWidth + 1.5;
  btsSwiper.style.transform = `translateX(-${btsIndex * slideW}px)`;
}

document.getElementById('btsNext').addEventListener('click', () => {
  const max = btsSlides.length - btsVisible();
  btsIndex = Math.min(btsIndex + 1, max);
  updateBts();
});
document.getElementById('btsPrev').addEventListener('click', () => {
  btsIndex = Math.max(btsIndex - 1, 0);
  updateBts();
});

// Drag/swipe for BTS
let dragStart = null;
btsSwiper.addEventListener('mousedown', e => { dragStart = e.clientX; });
btsSwiper.addEventListener('mousemove', e => { if (dragStart !== null) e.preventDefault(); });
btsSwiper.addEventListener('mouseup', e => {
  if (dragStart === null) return;
  const diff = dragStart - e.clientX;
  if (Math.abs(diff) > 50) {
    const max = btsSlides.length - btsVisible();
    if (diff > 0) btsIndex = Math.min(btsIndex + 1, max);
    else btsIndex = Math.max(btsIndex - 1, 0);
    updateBts();
  }
  dragStart = null;
});

let touchStart = null;
btsSwiper.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
btsSwiper.addEventListener('touchend', e => {
  if (touchStart === null) return;
  const diff = touchStart - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    const max = btsSlides.length - btsVisible();
    if (diff > 0) btsIndex = Math.min(btsIndex + 1, max);
    else btsIndex = Math.max(btsIndex - 1, 0);
    updateBts();
  }
  touchStart = null;
}, { passive: true });

let resizeTick = false;
window.addEventListener('resize', () => {
  if (!resizeTick) {
    requestAnimationFrame(() => { updateBts(); resizeTick = false; });
    resizeTick = true;
  }
}, { passive: true });

/* ---------- CREW CARD FLIP (mobile tap) ---------- */
document.querySelectorAll('.crew-card-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    wrapper.classList.toggle('flipped');
  });
});

/* ---------- SCROLL REVEAL ---------- */
const revealElements = document.querySelectorAll(
  '.section-label, .section-title, .about-title, .about-underline, .service-card, .process-col, .movie-card, .about-vm-card, .exp-card, .founder-bio-block, .founders-photo, .crew-card-wrapper, .event-card, .partner-logo'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));
