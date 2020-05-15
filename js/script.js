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
        //функция которая показывет таб -> i это счетчик (номер елемента = 0 дефолтное значение). Так же добавляет класс активности, и показывает на странице
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
                /* делаем перебор псевдомассива. Нужно определить номер таба на который нажали. Во время перебора в переменной Tabs, если елемент этого псевдомассива равен тому на что кликнул пользовательб то мы берем его номер и показываем на странице */

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
        let deadline = '2020-05-14';

        function getRemainingTime(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / (1000 * 60) % 60)),
                seconds = Math.floor((t / 1000) % 60);
            return {
                total: t,
                days,
                hours,
                minutes,
                seconds
            }
        }

        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                days = document.querySelector('#days'),
                hours = document.querySelector('#hours'),
                minutes = document.querySelector('#minutes'),
                seconds = document.querySelector('#seconds'),
                timerID = setInterval(updateClock, 1000);
            updateClock();

            function setZero(num) {
                if (num >= 0 && num < 10) {
                    return `0${num}`
                } else {
                    return num
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
        setClock('.timer', deadline);
    }
    initTimer()

    // Modal Window
    function initModal() {
        const contactUs = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close');

        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            // убирает прокрутку
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId); //отключает открытие модально по истечению времени 

            //option to work with toggle 
            // modal.classList.toggle('show')
        }

        function closeModal(event) {

            modal.classList.add('hide');
            modal.classList.remove('remove');
            document.body.style.overflow = '';
            //option to work with toggle 
            // modal.classList.toggle('show')
        }
        contactUs.forEach(item => item.addEventListener('click', openModal))
        modalCloseBtn.addEventListener('click', closeModal);

        // функция которая выключает модальное окно если кликнуть по подложке 
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.keyCode == 27 && modal.classList.contains('show')) {
                closeModal();
            }
        });
        //открывает модалку по истечению времени
        // const modalTimerId = setTimeout(openModal, 5000);

        // function showModalByScroll() {
        //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        //         openModal();
        //         window.removeEventListener('scroll', showModalByScroll);
        //     }
        // }
        // window.addEventListener('scroll', showModalByScroll)
    }
    initModal();

    //class Usage for menu creation

    function cardCreationClass() {

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
                this.price = this.price * this.transfer
            }

            render() {
                const div = document.createElement('div');
                if (this.classes.length === 0) {
                    this.div = 'menu__item';
                    div.classList.add(this.div);
                } else {
                    this.classes.forEach(className => div.classList.add(className))
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

        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            9,
            '.menu .container',

        ).render();

        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, нои качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без походав ресторан!',
            14,
            '.menu .container',

        ).render();

        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствиепродуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            9,
            '.menu .container',

        ).render();
    }
    cardCreationClass();

});