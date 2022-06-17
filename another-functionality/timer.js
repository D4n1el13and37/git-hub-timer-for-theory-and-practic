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
/*
ff
*/
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
  /*
   * создаем тут еще две переменные в которых храним значения по таймеру с теорией
   * и таймер с практикой(напоминаю, которые просто ХРАНЯТ значения того, сколько ты уже
   * отсидел за практикой и за теорией)
   * 
   * __Честно говоря__
   * объемы функции с таймером пугают, думаю, стоит их еще раз пересмотреть, что бы не пугаться
   * и не путаться, может быть даже стоит их разбить коментариями "//" что из них за что отвечает
   * __...__
   * 
   */
  //данный метод просто передает значения amount в данный момент
  const getAmount = () => amount

  //callback - я разбирал в другом примере, обратись туда!!!
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
/**
 * 1. плохая логика, так как при нажатии кнопки стоп в counter amount становится 0!!!
 * и дальнейшее воспроизведение таймера начинается в обратную сторону !!!
 * 
 * 2. если поставить паузу, а затем снова нажать кнопку старт, то таймер поёдет по новой,
 * так как значение amount(почему я еще не понял) неизменно и таймер грубо говоря обнуляется
 * и считает тебе опять 2400 секунд от 600 секунд теории, хотя, ты уже просидел 2000 секунд
 */

elements.countdown.pause.addEventListener('click', () => countdown.pause())

elements.countdown.stop.addEventListener('click', () => countdown.stop())
/**
 * Когда нажали на стоп, что бы происходило нечто подобное:
 * 1. в (Ф) таймер, передается значение amount*4 и сохраняется в переменной которая будет отображаться на экране
 * 
 * 2. после нажатия доступ к теории приостановить?
 */
// -- UI logic
countdown.onTick((amount) => {
  elements.countdown.output.innerText = amount
})
