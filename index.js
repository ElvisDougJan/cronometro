const { cronometro } = require('./crono')

setInterval(() => {
  console.clear()
  console.log(cronometro('2019-09-16T20:08:10.000Z', false))
}, 1000)