window.addEventListener("DOMContentLoaded", () => {
  // Tab Creation
  function initTabs() {
    const tabs = document.querySelectorAll(".tabheader__item"),
      tabsContent = document.querySelectorAll(".tabcontent"),
      tabsParent = document.querySelector(".tabheader__items");
    //Скрывает табы, перебирает массив данных и к каждому елементу добавляет стиль display = 'none'
    function hideTabContent() {
      tabsContent.forEach((item) => {
        item.classList.add("hide");
        item.classList.remove("show", "fade");
        // item.style.display = 'none';
      });
      // также она перебирает все табы и  убирает tabheader__item_active
      tabs.forEach((tab) => {
        tab.classList.remove("tabheader__item_active");
      });
    }
    //функция которая показывет таб -> i это счетчик (номер елемента = 0 дефолтное значение).
    // Так же добавляет класс активности, и показывает на странице
    function showTabContent(i = 0) {
      tabsContent[i].classList.add("show", "fade");
      tabsContent[i].classList.remove("hide");
      // tabsContent[i].style.display = 'block';
      tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    // навешивает оброботчик событий на нашю менюшку, что бы определить какой ТАБ был выбран
    tabsParent.addEventListener("click", (event) => {
      const target = event.target; // определяет куда было нажато

      // делаем проверку, что нажатие было по табу, а не в пустое место
      if (target && target.classList.contains("tabheader__item")) {
        /* делаем перебор псевдомассива. Нужно определить номер таба на который нажали. 
                Во время перебора в переменной Tabs, если елемент этого псевдомассива 
                равен тому на что кликнул пользовательб то мы берем его номер и показываем на странице */

        // во время перебора используем каждый елемент (item) и его номер по порядку (i).
        tabs.forEach((item, i) => {
          if (target == item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    });
  }
  initTabs();

  // TIMER
  function initTimer() {
    let deadline = "2020-05-14";

    function getRemainingTime(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / (1000 * 60)) % 60),
        seconds = Math.floor((t / 1000) % 60);
      return {
        total: t,
        days,
        hours,
        minutes,
        seconds,
      };
    }

    function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
        days = document.querySelector("#days"),
        hours = document.querySelector("#hours"),
        minutes = document.querySelector("#minutes"),
        seconds = document.querySelector("#seconds"),
        timerID = setInterval(updateClock, 1000);
      updateClock();

      function setZero(num) {
        if (num >= 0 && num < 10) {
          return `0${num}`;
        } else {
          return num;
        }
      }

      function updateClock() {
        const t = getRemainingTime(endtime);
        days.textContent = setZero(t.days);
        hours.textContent = setZero(t.hours);
        minutes.textContent = setZero(t.minutes);
        seconds.textContent = setZero(t.seconds);
        if (t.total <= 0) {
          clearInterval(timerID);
        }
      }
    }
    setClock(".timer", deadline);
  }
  initTimer();

  // Modal Window
  const contactUs = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    // убирает прокрутку
    document.body.style.overflow = "hidden";
    // clearInterval(modalTimerId); //отключает открытие модально по истечению времени

    //option to work with toggle
    // modal.classList.toggle('show')
  }

  function closeModal(event) {
    modal.classList.add("hide");
    modal.classList.remove("remove");
    document.body.style.overflow = "";
    //option to work with toggle
    // modal.classList.toggle('show')
  }
  contactUs.forEach((item) => item.addEventListener("click", openModal));

  // функция которая выключает модальное окно если кликнуть по подложке
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 27 && modal.classList.contains("show")) {
      closeModal();
    }
  });

  //открывает модалку по истечению времени
  // const modalTimerId = setTimeout(openModal, 5000);

  // function showModalByScroll() {
  //     if (window.pageYOffset +
  // document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
  //         openModal();
  //         window.removeEventListener('scroll', showModalByScroll);
  //     }
  // }
  // window.addEventListener('scroll', showModalByScroll)

  //class Usage for menu creation



    class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
      }
      changeToUAH() {
        this.price = this.price * this.transfer;
      }

      render() {
        const div = document.createElement("div");
        if (this.classes.length === 0) {
          this.div = "menu__item";
          div.classList.add(this.div);
        } else {
          this.classes.forEach((className) => div.classList.add(className));
        }

        div.innerHTML = ` 
            
                <img src="${this.src}" alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div> `;
        this.parent.append(div);
      }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json(); 
   };
   getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
// getResource('http://localhost:3000/menu')
// .then(data => createCard(data));

// function createCard(data){
//     data.forEach(({img, altimg, title, descr, price}) => {
//         const element = document.createElement('div');
//         price = price * 27;
//         element.classList.add('menu__item');
//         element.innerHTML = `
//         <img src="${img}" alt=${altimg}>
//         <h3 class="menu__item-subtitle">${title}</h3>
//         <div class="menu__item-descr">${descr}</div>
//         <div class="menu__item-divider"></div>
//         <div class="menu__item-price">
//             <div class="menu__item-cost">Цена:</div>
//             <div class="menu__item-total"><span>${price}</span> грн/день</div>
//         </div> 
//         `;
//         document.querySelector('.menu .container').append(element);
//     });
    
// }
    
// axios.get('http://localhost:3000/menu')
//    .then(data =>{
//     data.data.forEach(({img, altimg, title, descr, price}) => {
//     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//         });
//    });

  //Forms

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    success: "Cпасибо! Скоро мы с вами свяжемся",
    failure: "Oops. Something went wrong!",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });
    const postData = async (url, data) => {
         const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: data
         });
         return await res.json(); 
    };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto
            `;
      form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);
     
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add(".modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div> 
            </div>        
        `;
    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  //SLIDER

  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1;
  let offset = 0;

      if(slides.length < 10){
          total.textContent = `0${slides.length}`;
          current.textContent = `0${slideIndex}`;
      }else{
          total.textContent = slides.length;
          current.textContent = slideIndex;
      } 

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++){
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      if(i === 0){
          dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
  }

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  next.addEventListener('click', () => {
    if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
        offset = 0;
    }else{
        offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if(slideIndex == slides.length){
        slideIndex = 1;
    }else {
        slideIndex++;
    }
    if(slides.length < 10){
        current.textContent = `0${slideIndex}`;
    }else{
        current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  });
  prev.addEventListener('click', () => {
    if(offset == 0){
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    }else{
        offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if(slideIndex == 1){
        slideIndex = slides.length;
    }else {
        slideIndex--;
    }

    if(slides.length < 10){
        current.textContent = `0${slideIndex}`;
    }else{
        current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;

  });

  dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
          const slideTo = e.target.getAttribute('data-slide-to');
          slideIndex = slideTo;
          offset = +width.slice(0, width.length - 2) * (slideTo - 1);
          slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
      });
  });

//   showSlides(slideIndex);

//   if(slides.length < 10){
//       total.textContent = `0${slides.length}`;
//   }else{
//       total.textContent = slides.length;
//   }

//   function showSlides(n) {
//     if(n > slides.length) {
//         slideIndex = 1;
//     }
//     if(n < 1){
//         slideIndex = slides.length;
//     }

//     slides.forEach(item => {
//         item.style.display = 'none';
//     });
//     slides[slideIndex - 1].style.display = 'block';

//     if(slides.length < 10){
//         current.textContent = `0${slideIndex}`;
//     }else{
//         current.textContent = slideIndex;
//     }
//   }

//   function plusSlides(n) {
//       showSlides(slideIndex += n);
//   }

//   prev.addEventListener('click', () => {
//       plusSlides(-1);
//   });
//   next.addEventListener('click', () => {
//       plusSlides(+1);
//   });




});
