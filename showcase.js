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
  // overlay.classList.toggle('hidden');
  // prevBtn.classList.toggle('hidden')
  // nextBtn.classList.toggle('hidden')
  body.classList.toggle('no-scroll')
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
})

overlay.addEventListener('click', openModal);


///////////////////////////////////////
// Header Carousel slides

const carousels = document.querySelectorAll('.carousel');
const viewTexts = document.querySelectorAll('.view-text')

let curSlide = 0;
const showSlide = function(n){
  carousels[curSlide].classList.toggle('active');
  viewTexts[curSlide].classList.toggle('active');
  curSlide+=n
  if(curSlide<0)
   curSlide=carousels.length-1;
  if(curSlide>=carousels.length)
    curSlide=0;

  carousels[curSlide].classList.toggle('active');
  viewTexts[curSlide].classList.toggle('active');

}
const forwardSlide = function(){
showSlide(1)
}
const backwardSlide = function(){
showSlide(-1)
}


prevBtn.addEventListener('click', backwardSlide)
nextBtn.addEventListener('click', forwardSlide)
