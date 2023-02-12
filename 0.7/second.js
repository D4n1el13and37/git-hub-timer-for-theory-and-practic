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
  changeTheme: document.querySelector("#theme"),
};

elements.timer.pause.disabled = true;

//функция принимающая параметры настройки цветовой гамммы и => object
const createTheme = (background, white, yellow, red) => ({
  background,
  white,
  yellow,
  red,
});

//задаем настрйоки для тем
const Theme = {
  dark: createTheme("#181818", "#FFF", "#ffd600", "#B40000"),
  light: createTheme("none", "none", "none", "#B40000"),
};

const Mode = {
  Theory: "Theory",
  Practice: "Practice",
};

const general = {
  mode: Mode.Theory,
  theme: "dark",
  language: "en",
};

//вывод на страницу
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

const setTheme = (obj, properties) => {
  for (const property in properties) {
    document
      .querySelector(":root")
      .style.setProperty(`--${property}`, properties[property]);
  }
};


//для получения применения темы при загрузке страницы
const getTheme = () => localStorage.getItem("application-theme");

if (getTheme() === "light") {
  general.theme = "light";

  const nextTheme = general.theme;

  setTheme(nextTheme, Theme[nextTheme]);
}

//реализация таймера
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

const getPracticeTime = () => localStorage.getItem("Practice time");
const getTheoryTime = () => localStorage.getItem("Theory time");
const getMainTime = () => localStorage.getItem("Main time");

// const setMode = () => 

const getMode = () => localStorage.getItem("Mode");
/**
 * Необходимо добавить в локал сторедж 
 * какой мод стоял у пользователя theory/practice; 
 */

//хз откуда это я придумал с иф стэйтментом но это работает(пока что), и ладно:)
if (JSON.parse(localStorage.getItem("Main time")) 
|| JSON.parse(localStorage.getItem("Theory time"))
|| JSON.parse(localStorage.getItem("Practice time"))) {
  //присваиваем значение theory и practice из localStorage.
  timer.theoryTime = +getTheoryTime();
  timer.practicTime = +getPracticeTime();
  timer.amount = +getMainTime();

  //выводим значения на экран
  elements.timer.output.innerText = timeOutput(timer.amount);
  elements.timer.totalTime.theory.innerText = timeOutput(timer.theoryTime);
  elements.timer.totalTime.practic.innerText = timeOutput(timer.practicTime);
}

/* функции слушателей */
const handleTimerStart = (event) => {
  let amount = timer.amount;
  timer.start(() => {
    ++amount;

    elements.timer.output.innerText = timeOutput(amount);
    /*не совсем корректно будет сохрянятся в локалку 
    так как если мы уъодим с сайта он же перестает считать)
    Надо чекнуть как это будет работать
    */
    localStorage.setItem("Main time", amount);
  }, 1000);

  elements.timer.pause.disabled = false;

  elements.timer.start.disabled = true;

  elements.changeMode.disabled = true;
};

const handleTimerPause = (event) => {
  timer.pause();

  elements.timer.start.disabled = false;

  elements.changeMode.disabled = false;

  elements.timer.pause.disabled = true;

  elements.timer.output.innerText = timeOutput(timer.amount);
};

const handleChangeMode = (event) => {
  //  timer.pause();
  switch (general.mode) {
    case Mode.Theory:
      general.mode = Mode.Practice;

      elements.changeMode.innerText = "GO to THEORY";

      timer.theoryTime += timer.amount;

      localStorage.setItem("Theory time", timer.theoryTime);

      elements.timer.totalTime.theory.innerText = timeOutput(timer.theoryTime);
      break;
    case Mode.Practice:
      general.mode = Mode.Theory;

      elements.changeMode.innerText = "GO to PRACTICE";

      timer.practicTime += timer.amount;

      localStorage.setItem("Practice time", timer.practicTime);

      elements.timer.totalTime.practic.innerText = timeOutput(
        timer.practicTime
      );
      break;
  }
  timer.stop();

  elements.timer.start.disabled = false;

  localStorage.removeItem("Main time");

  elements.timer.output.innerText = "00:00:00";
};

const handleChangeTheme = (event) => {
  const nextTheme = general.theme === "dark" ? "light" : "dark";

  general.theme = nextTheme;

  localStorage.setItem("application-theme", nextTheme);

  setTheme(nextTheme, Theme[nextTheme]);
};

/*слушатели*/
elements.timer.start.addEventListener("click", handleTimerStart);

elements.timer.pause.addEventListener("click", handleTimerPause);

elements.changeMode.addEventListener("click", handleChangeMode);

elements.changeTheme.addEventListener("click", handleChangeTheme);
