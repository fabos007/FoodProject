function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);
  //Скрывает табы, перебирает массив данных и к каждому елементу добавляет стиль display = 'none'
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
      // item.style.display = 'none';
    });
    // также она перебирает все табы и  убирает tabheader__item_active
    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }
  //функция которая показывет таб -> i это счетчик (номер елемента = 0 дефолтное значение).
  // Так же добавляет класс активности, и показывает на странице
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    // tabsContent[i].style.display = 'block';
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  // навешивает оброботчик событий на нашю менюшку, что бы определить какой ТАБ был выбран
  tabsParent.addEventListener("click", (event) => {
    const target = event.target; // определяет куда было нажато

    // делаем проверку, что нажатие было по табу, а не в пустое место
    if (target && target.classList.contains(tabsSelector.slice(1))) {
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