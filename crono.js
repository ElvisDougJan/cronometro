const moment = require('moment')
const horaSalva = '02:05:00'

let difSegundos = 0

let segundoContado = 0
let minutoContado = 0
let horaContada = 0

function calculaHoras(dataInicial, pausado, dataAtual) {
  let diferenca = (new Date(dataAtual).getTime() - new Date(dataInicial).getTime()) / 1000
  diferenca /= (3600)
  let horas = parseInt(diferenca)
  horas = horas < 10 ? String("0" + horas) : String(horas)
  return horas
}

function calculaMinutos(dataInicial, pausado, dataAtual) {
  let segundosDataInial = (60 - new Date(dataInicial).getSeconds())

  let diferenca = (new Date(dataAtual).getTime() - new Date(dataInicial).getTime()) / 1000

  let segundosParaSubtrair = segundosDataInial + (60 - difSegundos)

  diferenca += segundosParaSubtrair
  diferenca /= 60

  let minutos = parseInt(diferenca)
  minutos -= (60 * calculaHoras(dataInicial, pausado, dataAtual))
  minutos = minutos < 10 ? String("0" + minutos) : String(minutos)
  return minutos - 2
}

function calculaSegundos(dataInicial, pausado, dataAtual) {
  let sec = new Date().getSeconds()
  sec = sec < 10 ? String("0" + sec) : String(sec)
  if (pausado) sec = "00"
  return sec
}

function contaSegundos(segundos) {
  let segInt = parseInt(segundos)
  let segSalvo = parseInt(horaSalva.substring(6, 8))

  difSegundos = parseInt(String(segSalvo).replace('-', ''))

  return segInt += difSegundos
}

function contaMinutos(minutos) {
  let minInt = parseInt(minutos)
  let minSalvo = parseInt(horaSalva.substring(3, 5))

  let diferenca = parseInt(String(minSalvo).replace('-', ''))

  return minInt += diferenca
}

function contaHoras(hora) {
  let resultado = 0
  let horaInt = parseInt(hora)
  let horSalva = parseInt(horaSalva.substring(0, 2))

  if (horaInt > 0) {
    horSalva -= 24
    resultado = horaInt + parseInt(String(horSalva).replace('-', ''))
  }

  return resultado
}

function adicionaZeroNaFrente(valor) {
  return valor < 10
    ? "0" + String(valor)
    : String(valor)
}

function somaHoras(hora, minutos, segundos) {
  let horaSalvaInicial = parseInt(horaSalva.substring(0, 2))

  if (contaSegundos(segundos) >= 60) segundoContado = contaSegundos(segundos) - 60
  else segundoContado = contaSegundos(segundos)

  if (contaMinutos(minutos) >= 60) minutoContado = contaMinutos(minutos) - 60
  else minutoContado = contaMinutos(minutos)

  if (contaHoras(hora) >= 24) horaContada = contaHoras(hora) - 24
  else horaContada = contaHoras(hora)

  horaContada = adicionaZeroNaFrente(horaContada + horaSalvaInicial)
  minutoContado = adicionaZeroNaFrente(minutoContado)
  segundoContado = adicionaZeroNaFrente(segundoContado)

  return `${horaContada}:${minutoContado}:${segundoContado}`
}

exports.cronometro = (dataInicial, pausado) => {
  let dataAtual = moment().format('YYYY-MM-DD HH:mm:ss')

  dataAtual = new Date(dataAtual)

  let sec = calculaSegundos(dataInicial, pausado, dataAtual)
  let minutos = calculaMinutos(dataInicial, pausado, dataAtual)
  let hora = calculaHoras(dataInicial, pausado, dataAtual)

  return !pausado
    ? somaHoras(hora, minutos, sec)
    : horaSalva
}
