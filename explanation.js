//Timer

const deadline = "2020-05-20";
// функция которая определяет время между текущим и дедлайном
function getTimeRemaining(endtime) {
    //превращает строку в милисекунды, отнимает дату окончания от текущей даты и дает строку в миллисекундах
    const t = Date.parse(endtime) - Date.parse(new Date());
    // cоздаем переменную дни
    // Количество милисекунд и разделить на количество милисекунд в одном дне
    // округляем -> t/ на 1000 = 1 sec
    //1 sec * 60 -> 1 min * 60 -> 1 hour * 24 -> 1 day
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    // создаем часы
    // остаток от деления используем что бы получить часы, например у нас получилось 50 часов / 24 -> Остаеться 2 часа
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    //cоздаем минуты
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    // создаем секунды
    const seconds = Math.floor((t / 1000) % 60);

    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };
}
// вспомагательная функция, что бы добавлять 0 перед числом
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
        // } else if (num < 0) {
        //   return "00";
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),
        timeInterval = setInterval(updateClock, 1000);
    updateClock(); // запускаем функцию что бы избежать баг с миганием даты
    // функция получает обьект данных с getRemaining и устанавливает их
    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);
        // очищает интервал когда <= 0
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock(".timer", deadline);