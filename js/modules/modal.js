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



export default modal;
export {closeModal};
export {openModal};