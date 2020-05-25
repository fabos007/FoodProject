/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calculator() {
  const result = document.querySelector('.calculating__result span');
    
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
  } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
  } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
  }

  function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
          result.textContent = '____';
          return;
      }
      if (sex === 'female') {
          result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
          result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
  }

  calcTotal();

  function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
          elem.classList.remove(activeClass);
          if (elem.getAttribute('id') === localStorage.getItem('sex')) {
              elem.classList.add(activeClass);
          }
          if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
              elem.classList.add(activeClass);
          }
      });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function getStaticInformation(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
          elem.addEventListener('click', (e) => {
              if (e.target.getAttribute('data-ratio')) {
                  ratio = +e.target.getAttribute('data-ratio');
                  localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
              } else {
                  sex = e.target.getAttribute('id');
                  localStorage.setItem('sex', e.target.getAttribute('id'));
              }
  
              elements.forEach(elem => {
                  elem.classList.remove(activeClass);
              });
  
              e.target.classList.add(activeClass);
  
              calcTotal();
          });
      });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {
          if (input.value.match(/\D/g)) {
              input.style.border = "1px solid red";
          } else {
              input.style.border = 'none';
          }
          switch(input.getAttribute('id')) {
              case "height":
                  height = +input.value;
                  break;
              case "weight":
                  weight = +input.value;
                  break;
              case "age":
                  age = +input.value;
                  break;
          }

          calcTotal();
      });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');


}

/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function cards () {
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

}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms() {
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
    Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])();

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
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])();
    }, 4000);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, closeModal, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  // убирает прокрутку
  document.body.style.overflow = "hidden";
  console.log(modalTimerId);
  if(modalTimerId){
    clearInterval(modalTimerId); //отключает открытие модально по истечению времени
  }
  //option to work with toggle
  // modal.classList.toggle('show')
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("remove");
  document.body.style.overflow = "";
  //option to work with toggle
  // modal.classList.toggle('show')
}


function modal(triggerSelector, modalSelector, modalTimerId) {
  const contactUs = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  
  contactUs.forEach((item) => item.addEventListener("click", () => openModal(modalSelector, modalTimerId)));

  // функция которая выключает модальное окно если кликнуть по подложке
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 27 && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  

  function showModalByScroll() {
      if (window.pageYOffset +
  document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          openModal(modalSelector, modalTimerId);
          window.removeEventListener('scroll', showModalByScroll);
      }
  }
  window.addEventListener('scroll', showModalByScroll);


}



/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider() {
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

  function deleteNoDigits(str) {
        return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    if(offset == deleteNoDigits(width) * (slides.length - 1)){
        offset = 0;
    }else{
        offset += deleteNoDigits(width);
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
        offset = deleteNoDigits(width) * (slides.length - 1);
    }else{
        offset -= deleteNoDigits(width);
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
          offset = deleteNoDigits(width) * (slideTo - 1);
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
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs() {
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

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer () {
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

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

      
      
      
      
      
      
      

window.addEventListener("DOMContentLoaded", () => {
        const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["openModal"])('.modal', modalTimerId), 5000000);

        Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
        Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
        Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
        Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
        Object(_modules_calculator__WEBPACK_IMPORTED_MODULE_4__["default"])();
        Object(_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])();
        Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();

 
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map