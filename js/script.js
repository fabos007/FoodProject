window.addEventListener("DOMContentLoaded", () => {

    // Создание ТАБОВ
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
                t,
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
    }
    initModal();
});