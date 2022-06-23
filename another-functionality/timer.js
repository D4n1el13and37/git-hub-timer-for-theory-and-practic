const elements = {
  timer: {
    start: document.querySelector('#timer-button-start'),
    pause: document.querySelector('#timer-button-pause'),
    clear: document.querySelector('#timer-button-clear'),
    output: document.querySelector('#timer-output'),
  },
  changeMode: {
    toPractic: document.querySelector('#button-practic'),
    //toTheory: document.querySelector("")
  },
  countdownTimer: {
    start: document.querySelector('#countdown-button-start'),
    pause: document.querySelector('#countdown-button-pause'),
    clear: document.querySelector('#countdown-button-clear'),
  },
}

// const createTimer = (callback) => ({
//   amount: 0,
//   interval: null,
//   start(ms) {
//     this.interval = setInterval(() => callback(this), ms)
//   },
//   pause() {
//     clearInterval(this.interval)
//   },
//   // clear() {
//   //   this.pause()

//   //   this.amount = 0
//   // },
// })

/**
 * timer
 */
const timer = {
  amount: 0,
  interval: null,
  forCallback: 0,
  start(callback, ms) {
    this.interval = setInterval(callback, ms)
  },
  pause() {
    clearInterval(this.interval)
  },
  clear() {
    this.pause()

    this.amount = 0
  },
}

// var thatTime = 0;

/**
 * function for Event
 */
const handleTimerStart = (event) => {
  timer.start(() => {
    elements.timer.output.innerText = ++timer.amount

    timer.forCallback = timer.amount * 4
  }, 500)

  elements.timer.start.disabled = true
}

const handleTimerPause = (event) => {
  timer.pause()

  elements.timer.start.disabled = false
}

const handleTimerClear = (event) => {
  timer.clear()

  elements.timer.output.innerText = timer.amount

  elements.timer.start.disabled = false
}

const handleToPractic = (event) => {
  console.log(timer.forCallback)

  timer.pause()

  elements.timer.start.disabled = true

  elements.timer.clear.disabled = true

  elements.timer.pause.disabled = true
}

/**
 * eventListener's
 */

elements.timer.start.addEventListener('click', handleTimerStart)

elements.timer.pause.addEventListener('click', handleTimerPause)

elements.timer.clear.addEventListener('click', handleTimerClear)

elements.changeMode.toPractic.addEventListener('click', handleToPractic)

/**
 * может использовать один таймер для всех ивентов?
 * (не забывай, что время затраченное на теорию в 4 раза меньше затраченного на практику)
 */
/**
 * переделать кнопки таким образом:
 * 1.
 * При нажатии кнопки "переход к практике"
 * остальные кнопки блока таймера должны стать inactive
 * (как и те кнопки что говорят нам об обратном таймере
 * до момента нажатия)
 * или
 * Сделать так что бы одна и та же кнопка, например тот же "старт"
 * после нажатия кнопки "переход к практике", стала кнопкой СТАРТА
 * для практического таймера!!!
 * 2.
 * Таймер не может уходить в отрицательное число, таким образом
 * например при достижении 0 на практике выводить Allert ("Минимальное затраченное
 * время на практику кончилось, вы можете продолжить практиковаться(что определенно лучше)
 * или снова перейти к теории")
 * 3.
 * Добавить фишку отображающая сколько времени ты всего потратил на обучение
 * дескать столько ты всего потратил на теорию, а столько то на практику (2 переменные с выводом прост,
 * возможно с сохранением в локал сторэдж)
 */

const countdownTimerStart = (event) => {
  timer.start(() => {
    elements.timer.output.innerText = --timer.forCallback

    if (timer.forCallback <= 0) {
      timer.clear()

      console.log('DONE')
    }
  }, 500)

  elements.countdownTimer.start.disabled = true
}

const countdownTimerPause = (event) => {
  if (timer.amount > 0) {
    timer.pause()

    elements.countdownTimer.start.disabled = false
  }
}

const countdownTimerClear = (event) => {
  sure = confirm('Are u sure?') //для подтверждения сброса практики, используем конферм

  if (sure) {
    timer.clear()

    elements.timer.output.innerText = 0

    elements.countdownTimer.start.disabled = false
  }
}

elements.countdownTimer.pause.addEventListener('click', countdownTimerPause)

elements.countdownTimer.start.addEventListener('click', countdownTimerStart)

elements.countdownTimer.clear.addEventListener('click', countdownTimerClear)

function turnOffAllButton() {}
