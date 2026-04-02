
const btnScrollTo = document.querySelector('#btn--scroll-to');
const section1 = document.querySelector('#section--1');


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
// Routing
const routes = {
    "/": "index.html",
    "/Mike-Brighton": "/pages/Mike-Brighton.html",
    "/Kishis-restaurant": "/pages/Kishis-Restaurant.html",
    "/International-Nursery-School": "/pages/International-Nursery-School.html",
    "/Gabriella-Bilingual-School": "/pages/Gabriella-Bilingual-School.html",
    "/Evelyn": "/pages/Evelyn.html"
};

const router = async () => {
    const path = window.location.pathname;
    const resource = routes[path] || "/404.html";

    // 1. Fetch the external HTML file
    try {
        const response = await fetch(resource);
        
        if (!response.ok) throw new Error("Page not found");
        
        // 2. Convert the response to text
        const html = await response.text();

        // 3. Inject it into the page
        document.getElementById("app").innerHTML = html;
    } catch (error) {
        document.getElementById("app").innerHTML = "<h1>Error loading page</h1>";
    }
};

// Standard navigation handling
const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    router();
};

document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.getAttribute("href"));
    }
});

window.addEventListener("popstate", router);
router();

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
};
slider();