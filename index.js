const { cronometro } = require('./crono')

setInterval(() => {
  console.clear()
  console.log(cronometro('2019-09-17T13:07:00.000Z', false))
}, 1000)