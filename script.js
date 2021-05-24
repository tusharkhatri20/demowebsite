'use strict';

// import { brown } from "color-name";

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  // console.log(s1cords)
  window.scrollTo(
    {
      left: s1cords.left + window.pageXOffset,
      top: s1cords.top + window.pageYOffset,
      behavior: 'smooth',
    }
  );
  //or
  // section1.scrollIntoView({behavior:'smooth'})
});


document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})


//Tabbed Components

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')


tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked)
  clicked.classList.add('operations__tab--active')

  if (!clicked) return;

  tabs.forEach(e => e.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));


  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})


//nav link animation

// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link')
//     const logo = link.closest('.nav').querySelector('img')

//     siblings.forEach(el => {
//       if (el != link) el.style.opacity = 0.5;
//     })
//     logo.style.opacity = 0.5

//   }
// })
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link')
//     const logo = link.closest('.nav').querySelector('img')

//     siblings.forEach(el => {
//       if (el != link) el.style.opacity = 1;
//     })
//     logo.style.opacity = 1


//   }
// })//                          OR



const handleHover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if (el != link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity

  }
}

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5)
});


nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1.0)
});



// //sticky navigation
// const initialcords = section1.getBoundingClientRect();
// // console.log(initialcords)

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialcords.top)
//     nav.classList.add('sticky');
//   else
//     nav.classList.remove('sticky')
// })

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {console.log(entry)});
// };

// const obsOptions = {
//   root: null,
//   threshold:0
// }


// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const stickyNav = function (e) {
  const [entry] = e;
  // console.log(entry)

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px'

});

headerObserver.observe(header)

const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden')

}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.30
})

allSections.forEach(function (section) {
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})

//lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]')
console.log(imgTargets)

const loadImg = function (entries, observer) {
  const [entry] = entries
  // console.log(entry)

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src


  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')

  })

};


const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))


const slides = document.querySelectorAll('.slide')

const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

let curSlide = 0;
const maxSlide = slides.length;

const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.3) translateX=(-800px)';
slider.style.overflow = 'visible';


const goToSlide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));

}
goToSlide(0)

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0
  }
  else {
    curSlide++
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide === maxSlide - 1
  }
  else {
    curSlide--
  }
  goToSlide(curSlide);

}
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown',function(e){
  e.key=='ArrowLeft'&& prevSlide()
  e.key=='ArrowRight'&& nextSlide()

})
