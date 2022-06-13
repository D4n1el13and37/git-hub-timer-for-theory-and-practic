const elements = {
  counter: {
    start: document.querySelector('#counter-button-start'),
    pause: document.querySelector('#counter-button-pause'),
    stop: document.querySelector('#counter-button-stop'),
    output: document.querySelector('#counter-output'),
  },
  countdown: {
    start: document.querySelector('#countdown-button-start'),
    pause: document.querySelector('#countdown-button-pause'),
    stop: document.querySelector('#countdown-button-stop'),
    output: document.querySelector('#countdown-output'),
  },
}

/**
 * Можно переписать функцию createTimer с использованием this вместо замыканий.
 *
 * Пример:
 *
 * const createTimer = (callback) => {
 *   return {
 *     amount: 0,
 *     get() {
 *       return this.amount
 *     },
 *
 *     listeners: [],
 *     onTick() {
 *       // тут логика добавления функции переданной в onTick в массив listeners
 *     }
 *   }
 * }
 *
 */

/**
 *
 * Доработать функционал для удовлетворения потребностей пользователя.
 *
 * Для этого придётся добавить методы в возвращаемый объект функцией createTimer, нужно:
 *
 * 1. onStop - для обработки окончания работы таймер
 *    counter.onStop()
 *
 */

// Abstraction
const createTimer = (callback) => {
  let interval = null
  let amount = 0
  let listeners = []

  const getAmount = () => amount

  const setAmount = (callback) => {
    amount = callback(amount)
  }

  const start = (milliseconds) => {
    interval = setInterval(() => {
      setAmount(callback)
      for (const listener of listeners) listener(amount)
    }, milliseconds)
  }

  const pause = () => {
    clearInterval(interval)
  }

  const stop = () => {
    pause()
    setAmount(() => 0)
  }

  const onTick = (callback) => listeners.push(callback)

  return { start, pause, stop, onTick, getAmount, setAmount }
}

// Counter Logic
const counter = createTimer((amount) => amount + 1)

// -- Listeners
elements.counter.start.addEventListener('click', () => counter.start(1000))

elements.counter.pause.addEventListener('click', () => counter.pause())

elements.counter.stop.addEventListener('click', () => counter.stop())

// -- UI logic
counter.onTick((amount) => {
  elements.counter.output.innerText = amount
})

counter.onTick(console.log)
// Example of onStop
// В onStop нужно сделать назначение нужного amount для countdown (countdown.setAmount( ... ))
// counter.onStop(console.log)
// counter.onStop(amount => alert(`Your practise time is: ${amount * 4}`))

// Countdown Logic
const countdown = createTimer((amount) => amount - 1)

// -- Listeners
elements.countdown.start.addEventListener('click', () => {
  countdown.setAmount(() => counter.getAmount() * 4)
  countdown.start(1000)
})

elements.countdown.pause.addEventListener('click', () => countdown.pause())

elements.countdown.stop.addEventListener('click', () => countdown.stop())

// -- UI logic
countdown.onTick((amount) => {
  elements.countdown.output.innerText = amount
})
