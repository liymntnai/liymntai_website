(function () {
///////////////////////////////////////
// Modal
const modalContainer = document.querySelector('.modal-container');
const body = document.querySelector('body')
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const openModal = function () {
  modalContainer.classList.toggle('active');
  // overlay.classList.toggle('none')
  // overlay.classList.toggle('hidden');
  // prevBtn.classList.toggle('hidden')
  // nextBtn.classList.toggle('hidden')
  body.classList.toggle('no-scroll')
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
})

overlay.addEventListener('click', openModal);
if (btnCloseModal) btnCloseModal.addEventListener('click', openModal);


///////////////////////////////////////
// Header Carousel slides

const carousels = document.querySelectorAll('.carousel');
const viewText = document.querySelector('.view-text')

let curSlide = 0;
let views = ['Desktop View', 'Tablet View', 'Mobile View']
const showSlide = function(n){
  carousels[curSlide].classList.toggle('active');
  curSlide+=n
  if(curSlide<0)
   curSlide=carousels.length-1;
  if(curSlide>=carousels.length)
    curSlide=0;

  carousels[curSlide].classList.toggle('active');
  viewText.textContent = views[curSlide]

}
const forwardSlide = function(){
showSlide(1)
}
const backwardSlide = function(){
showSlide(-1)
}


prevBtn.addEventListener('click', backwardSlide)
nextBtn.addEventListener('click', forwardSlide)

///////////////////////////////////////
// Swipe through carousel slides (touch/pointer)
const swipeArea = document.querySelector('.modal .content-4 > div:first-child');
const SWIPE_THRESHOLD = 40;
let swipeStartX = 0;
let swipeStartY = 0;
let isSwiping = false;
let swipeHandled = false;

if (swipeArea) {
  swipeArea.style.touchAction = 'pan-y';

  swipeArea.addEventListener('pointerdown', function (e) {
    swipeStartX = e.clientX;
    swipeStartY = e.clientY;
    isSwiping = true;
    swipeHandled = false;
  });

  swipeArea.addEventListener('pointermove', function (e) {
    if (!isSwiping || swipeHandled) return;

    const deltaX = e.clientX - swipeStartX;
    const deltaY = e.clientY - swipeStartY;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;

    swipeHandled = true;
    deltaX < 0 ? forwardSlide() : backwardSlide();
  });

  const endSwipe = function () {
    isSwiping = false;
    swipeHandled = false;
  };

  swipeArea.addEventListener('pointerup', endSwipe);
  swipeArea.addEventListener('pointercancel', endSwipe);
  swipeArea.addEventListener('pointerleave', endSwipe);
}
})();