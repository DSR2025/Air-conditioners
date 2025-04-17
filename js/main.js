const swiper = new Swiper('.companiesSwiper', {
    loop: true,
    loopAdditionalSlides: 10, // Добавляем дополнительные слайды для бесшовности
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      waitForTransition: true // Ждать завершения анимации
    },
    speed: 800, // Более плавная анимация
    spaceBetween: 20,
    centeredSlides: false, // Попробуйте отключить
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    },
    // Отключаем предварительный расчет размеров для loop
    loopPreventsSlide: false,
    // Улучшаем обработку касаний
    touchReleaseOnEdges: true,
    resistanceRatio: 0.5
  });

  Fancybox.bind("[data-fancybox]", {

    Thumbs: {
      autoStart: true,
    },
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
  });