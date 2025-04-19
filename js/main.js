const swiper = new Swiper('.companiesSwiper', {
    loop: true,
    loopAdditionalSlides: 10, 
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
      waitForTransition: true 
    },
    speed: 800, 
    spaceBetween: 20,
    centeredSlides: false, 
    breakpoints: {
      375: {
        slidesPerView: 2.7,
        spaceBetween: 20
      },
      430: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4.7,
        spaceBetween: 20
      },

      1024: {
        slidesPerView: 5,
        spaceBetween: 20
      },
      1280: {
        slidesPerView: 6,
        spaceBetween: 20
      },
      1440: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    },

    loopPreventsSlide: false,

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

  document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    

    const name = this.elements.name;
    const tel = this.elements.tel;
    const email = this.elements.email;
    const checkbox = this.elements.consent;
    const formData = new FormData(this);
  

    if (!name.value.trim() || !tel.value.trim() || !email.value.trim()) {
      alert('Заполните обязательные поля!');
      return;
    }
  

    if (!checkbox.checked) {
      alert('Необходимо дать согласие на обработку данных!');
      return;
    }
  

    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      alert('Введите корректный email!');
      return;
    }
  

    if (tel.value.length < 5) {
      alert('Телефон слишком короткий!');
      return;
    }
  

    fetch('send_to_telegram.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Ошибка сервера');
      return response.json().catch(() => ({success: false, message: 'Неверный формат ответа'}));
    })
    .then(data => {
      if (data.success) {
        alert('Сообщение отправлено!');
        this.reset();
      } else {
        alert('Ошибка: ' + (data.message || 'Неизвестная ошибка'));
      }
    })
    .catch(error => {
      alert('Ошибка: ' + error.message);
      console.error('Ошибка:', error);
    });
  });

  const burgerMenu = document.getElementById('burgerMenu');
  const sidebar = document.getElementById('sidebar');
  const burgerClose = document.querySelector('.burger_close');
  const overlay = document.getElementById('overlay');
  
  function toggleMenu() {
      burgerMenu.classList.toggle('active');
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
  }
  
  burgerMenu.addEventListener('click', toggleMenu);
  
  burgerClose.addEventListener('click', (e) => {
      e.preventDefault();
      burgerMenu.classList.remove('active');
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
  });
  
  
  document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !burgerMenu.contains(e.target) && overlay.classList.contains('active')) {
          burgerMenu.classList.remove('active');
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
      }
  });
  
  