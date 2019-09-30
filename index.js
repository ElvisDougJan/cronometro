const { cronometro } = require('./crono')

setInterval(() => {
  console.clear()
  console.log(cronometro('2019-09-20T13:38:00.000Z', false, '00:00:00', '00:10:00'))
}, 1000)
