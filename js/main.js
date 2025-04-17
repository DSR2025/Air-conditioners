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