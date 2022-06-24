const elements = {
  timer: {
    start: document.querySelector("#timer-button-start"),
    pause: document.querySelector("#timer-button-pause"),
    stop: document.querySelector("#timer-button-stop"),
    output: {
      seconds: document.querySelector("#timer-output-seconds"),
      minutes: document.querySelector("#timer-output-minutes"),
      hours: document.querySelector("#timer-output-hours"),
    },
    totalTime: {
      //объеденить весь вывод в один объект?
      theory: document.querySelector("#theory-time-output"),
      practic: document.querySelector("#practic-time-output"),
    },
  },
  changeMode: document.querySelector("#button-practic"),
};

/**
 * we need to make output by use 1 function,
 * and apropriate it at our variable's
 */
const outputTimer = {
  //output on webpage?
  seconds: null,
  minutes: null,
  hours: null,
};

const timeOutput = (iteration) => {
  const seconds = iteration > 0 ? iteration % 60 : 0; //тут все круто все правильно
  const minutes = iteration / 60 > 0 ? Math.floor(iteration / 60) % 60 : 0;
  const hours = iteration / 3600 > 0 ? Math.floor(iteration / 60 / 60) % 60 : 0;

  seconds.textContent = seconds < 10 ? "0" + seconds : seconds;
  minutes.textContent = minutes < 10 ? "0" + minutes : minutes;
  hours.textContent = hours < 10 ? "0" + hours : hours;

  
  console.log(seconds, minutes, hours);
  //we did it

  /*
  if (seconds == 60) {
    seconds = 0;
  }
  if (iteration % 60 == 0) {
    minutes++;
  }
  if (iteration % 3600 == 0) {
    hours++;
  }
  */
  // S = iteration > 0 ? iteration % 60 : 0
  //return  {
  //  seconds < 10 ? "0" + seconds : seconds,
  // minutes < 10 ? "0" + minutes : minutes,
  //  hours < 10 ? "0" + hours : hours, }

  //как сделать вывод в определенную переменную ?
  //вывод значения одной строкой ?
};

const timer = {
  amount: 0,
  interval: null,
  practicTime: 0,
  theoryTime: 0,

  start(callback, ms) {
    this.interval = setInterval(callback, ms);
  },
  pause() {
    clearInterval(this.interval);

    elements.timer.start.disabled = false;
  },
  stop() {
    this.pause();

    this.amount = 0;
  },
};

const handleTimerStart = (event) => {
  timer.start(() => {
    elements.timer.output.innerText = ++timer.amount;
    //так как тут принимается в возврат лишь 1 значение то и выводить
    //лишь то что передали 1 к выводу, а именно seconds,
    //придумать так что бы при возврате значений учитывались все значения!
    //опеределенно требуется 3 переменных (мы их создали)
    //остается понять, как в каждую из них передавать параметры функции

    timeOutput(timer.amount);
  }, 1);

  elements.timer.start.disabled = true;
};

const handleTimerPause = (event) => {
  timer.pause();
};

const handleChangeMode = (event) => {
  if (elements.changeMode.innerText == "Practic") {
    elements.changeMode.innerText = "Theory";

    timer.theoryTime += timer.amount;

    elements.timer.totalTime.theory.innerText = timer.theoryTime;

    timeOutput(timer.theoryTime);
  } else {
    elements.changeMode.innerText = "Practic";

    timer.practicTime += timer.amount;

    elements.timer.totalTime.practic.innerText = timer.practicTime;
  }
  timer.stop();

  elements.timer.output.innerText = timer.amount;
};

elements.timer.start.addEventListener("click", handleTimerStart);

elements.timer.pause.addEventListener("click", handleTimerPause);

elements.changeMode.addEventListener("click", handleChangeMode);
