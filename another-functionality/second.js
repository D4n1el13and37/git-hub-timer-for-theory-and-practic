const elements = {
  timer: {
    start: document.querySelector("#timer-button-start"),
    pause: document.querySelector("#timer-button-pause"),
    stop: document.querySelector("#timer-button-stop"),
    output: document.querySelector("#timer-output"),
    totalTime: {
      //объеденить весь вывод в один объект?
      theory: document.querySelector("#theory-time-output"),
      practic: document.querySelector("#practic-time-output"),
    },
  },
  changeMode: document.querySelector("#button-practic"),
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
  },
  stop() {
    this.pause();

    this.amount = 0;
  },
};

const handleTimerStart = (event) => {
  timer.start(() => {
    elements.timer.output.innerText = ++timer.amount;
  }, 1000);

  elements.timer.start.disabled = true;
};

const handleTimerPause = (event) => {
  timer.pause();

  elements.timer.start.disabled = false;
};

const handleChangeMode = (event) => {
  if (elements.changeMode.innerText == "Go practic") {
    elements.changeMode.innerText = "Go theory";

    timer.theoryTime += timer.amount;

    elements.timer.totalTime.theory.innerText = timer.theoryTime;
  } else {
    elements.changeMode.innerText = "Go practic";

    timer.practicTime += timer.amount;

    elements.timer.totalTime.practic.innerText = timer.practicTime;
  }
  timer.stop();

  elements.timer.output.innerText = timer.amount;

  elements.timer.start.disabled = false;
};

elements.timer.start.addEventListener("click", handleTimerStart);

elements.timer.pause.addEventListener("click", handleTimerPause);

elements.changeMode.addEventListener("click", handleChangeMode);
