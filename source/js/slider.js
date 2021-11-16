var mySwiper = new Swiper ('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 600,
  initialSlide: 1,
   
  breakpoints: {
    1024: {
      slidesPerView: 2,
      spaceBetween: 37,
      initialSlide: 0,
    },

    1330: {
      slidesPerView: 3,
      spaceBetween: 30,
      initialSlide: 0,
    },
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper__btn-control_left',
    prevEl: '.swiper__btn-control_right',
  },  
});