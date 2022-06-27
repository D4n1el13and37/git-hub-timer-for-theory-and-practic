const elements = {
  timer: {
    start: document.querySelector("#timer-button-start"),
    pause: document.querySelector("#timer-button-pause"),
    stop: document.querySelector("#timer-button-stop"),
    output: document.querySelector("#timer-output"),
    totalTime: {
      theory: document.querySelector("#theory-time-output"),
      practic: document.querySelector("#practic-time-output"),
    },
  },
  changeMode: document.querySelector("#button-practic"),
};

function timeOutput(iteration) {
  const seconds = iteration > 0 ? iteration % 60 : 0;
  const minutes = iteration / 60 > 0 ? Math.floor(iteration / 60) % 60 : 0;
  const hours = iteration / 3600 > 0 ? Math.floor(iteration / 60 / 60) % 60 : 0;

  const result =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);

  return result;
}

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
    ++timer.amount;

    elements.timer.output.innerText = timeOutput(timer.amount);
  }, 1000);

  elements.timer.start.disabled = true;
};

const handleTimerPause = (event) => {
  timer.pause();
};

const handleChangeMode = (event) => {
  if (elements.changeMode.innerText == "Practic") {
    elements.changeMode.innerText = "Theory";

    timer.theoryTime += timer.amount;

    elements.timer.totalTime.theory.innerText = timeOutput(timer.theoryTime);
  } else {
    elements.changeMode.innerText = "Practic";

    timer.practicTime += timer.amount;

    elements.timer.totalTime.practic.innerText = timeOutput(timer.practicTime);
  }
  timer.stop();

  elements.timer.output.innerText = "00:00:00";
};

elements.timer.start.addEventListener("click", handleTimerStart);

elements.timer.pause.addEventListener("click", handleTimerPause);

elements.changeMode.addEventListener("click", handleChangeMode);
