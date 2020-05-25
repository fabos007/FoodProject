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

export default tabs;