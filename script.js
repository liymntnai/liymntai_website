
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
function navigate(event, page) {
    event.preventDefault(); // Prevent default link behavior
    window.history.pushState({}, page, page);
    fetchPageContent(page);
}

function fetchPageContent(page) {
    fetch(page + '.html')
        .then(response => {
            if (!response.ok) throw new Error('Page not found');
            return response.text();
        })
        .then(html => document.getElementById('content').innerHTML = html)
        .catch(error => console.error(error));
}

// Handle page reloads
window.onpopstate = () => {
    fetchPageContent(window.location.pathname.substring(1) || 'home');
};

// Initial load
fetchPageContent(window.location.pathname.substring(1) || 'home');