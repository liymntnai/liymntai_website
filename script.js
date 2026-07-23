
(function () {
const btnScrollTo = document.querySelector('#btn--scroll-to');
const section1 = document.querySelector('#section--1');
// title, desc, [modal images], preview images
const projects = [
  {elizy_queens:
    {title: "Elizy Queens",
     description: " Website for the sale of traditional gowns, chains and beed.",
     modal_image: ["img/Elizy-Desktop1.jpg", "img/Elizy-Tablet.jpg", "img/Elizy-Mobile.jpg"],
     preview_image: "img/Elizy-Slice.jpg"
    }
   },
   {elizy_queens:
    {title: "Elizy Queens",
     description: " Website for the sale of traditional gowns, chains and beed.",
     modal_image: ["img/Elizy-Desktop1.jpg", "img/Elizy-Tablet.jpg", "img/Elizy-Mobile.jpg"],
     preview_image: "img/Elizy-Slice.jpg"
    }
   },
   {elizy_queens:
    {title: "Elizy Queens",
     description: " Website for the sale of traditional gowns, chains and beed.",
     modal_image: ["img/Elizy-Desktop1.jpg", "img/Elizy-Tablet.jpg", "img/Elizy-Mobile.jpg"],
     preview_image: "img/Elizy-Slice.jpg"
    }
   }

]

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


///////////////////////////////////////
// Slider (native scroll-snap strip — swipeable by touch out of the box)
const slider = function () {
  const sliderEl = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  if (!sliderEl || !slides.length) return;

  const scrollByOneSlide = function (direction) {
    const gap = parseFloat(getComputedStyle(sliderEl).columnGap) || 0;
    const distance = slides[0].getBoundingClientRect().width + gap;
    sliderEl.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  const nextSlide = () => scrollByOneSlide(1);
  const prevSlide = () => scrollByOneSlide(-1);

  // Event handlers
  if (btnRight) btnRight.addEventListener('click', nextSlide);
  if (btnLeft) btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
};
slider();
})();