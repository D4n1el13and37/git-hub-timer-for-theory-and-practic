const createTimer = (callback) => {
  let interval = null
  let amount = 0
  let listeners = []

  //  -- очевидныМ образом, просто получает значение из amount!
  const getAmount = () => amount

  // устанавлтивает значения для amount 
  /**
   * НО мне не ясно каким образом работает этот callback и что он
   * делает собственно говоря, за что отвечает, какой вообще callback
   */
  const setAmount = (callback) => {
    amount = callback(amount)
  }

  //  -- метод который принимает на вход лишь 1 параметр, это MS 
  //но вся интересная логика что мне не понятно сейчас происходит в нём
  const start = (milliseconds) => {
    interval = setInterval(() => {
      setAmount(callback)
      for (const listener of listeners) listener(amount)
    }, milliseconds)
  }

  //  -- это понятно что останавливает интервал
  const pause = () => {
    clearInterval(interval)
  }

  //  -- это его останавливает, и зачищает, присваивая amount значение 0
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