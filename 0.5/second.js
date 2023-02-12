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

const Mode = {
  Theory: "Theory",
  Practice: "Practice",
};

const general = {
  mode: Mode.Theory,
};

const timer = {
  amount: 0,
  interval: null,
  practicTime: 0,
  theoryTime: 0,
  startDate: null,
  endDate: null,

  start(callback, ms) {
    this.interval = setInterval(callback, ms);

    this.startDate = new Date();
  },
  pause() {
    clearInterval(this.interval);

    this.endDate = new Date();

    this.amount += Math.floor((this.endDate - this.startDate) / 1000);
  },
  stop() {
    this.pause();

    this.amount = 0;
  },
};

const handleTimerStart = (event) => {
  let amount = timer.amount;
  timer.start(() => {
    ++amount;

    // console.log("TimerAmount: " + timer.amount);
    elements.timer.output.innerText = timeOutput(amount);
  }, 1000);
  elements.timer.start.disabled = true;
};

const handleTimerPause = (event) => {
  timer.pause();

  elements.timer.start.disabled = false;

  elements.timer.output.innerText = timeOutput(timer.amount);
};

const handleChangeMode = (event) => {
  timer.pause();
  switch (general.mode) {
    case Mode.Theory:
      general.mode = Mode.Practice;

      elements.changeMode.innerText = "GO to THEORY";

      timer.theoryTime += timer.amount;

      elements.timer.totalTime.theory.innerText = timeOutput(timer.theoryTime);
      break;
    case Mode.Practice:
      general.mode = Mode.Theory;

      elements.changeMode.innerText = "GO to PRACTIC";

      timer.practicTime += timer.amount;

      elements.timer.totalTime.practic.innerText = timeOutput(
        timer.practicTime
      );
      break;
  }
  timer.stop();

  elements.timer.start.disabled = false;

  elements.timer.output.innerText = "00:00:00";
};

elements.timer.start.addEventListener("click", handleTimerStart);

elements.timer.pause.addEventListener("click", handleTimerPause);

elements.changeMode.addEventListener("click", handleChangeMode);
