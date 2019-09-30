let horaSalva = '00:00:00'
let horaEstimada = '00:00:00'
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
  let segundosParaAdicionar = parseInt(horaSalva.substring(6, 8))

  let diferenca = (new Date(dataAtual).getTime() - new Date(dataInicial).getTime()) / 1000

  diferenca += segundosParaAdicionar

  diferenca /= 60

  let minutos = parseInt(diferenca)
  minutos -= (60 * calculaHoras(dataInicial, pausado, dataAtual))
  minutos = minutos < 10 ? String("0" + minutos) : String(minutos)
  return minutos
}

function calculaSegundos(dataInicial, pausado, dataAtual) {
  let segundoInicial = new Date(dataInicial).getSeconds()
  let segundoAtual = new Date(dataAtual).getSeconds()

  if (segundoAtual < segundoInicial) segundoAtual += 60

  let segundo = (segundoAtual - segundoInicial)

  segundo = segundo < 10 ? String("0" + segundo) : String(segundo)
  if (pausado) segundo = "00"
  return segundo
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

function porcentagemHoras(dataInicial, cronometro) {
  let hora = parseInt(cronometro.substring(0, 2))
  let minutos = parseInt(cronometro.substring(3, 5))
  let segundos = parseInt(cronometro.substring(6, 8))

  let hEstimada = parseInt(horaEstimada.substring(0, 2))
  let mEstimado = parseInt(horaEstimada.substring(3, 5))
  let sEstimado = parseInt(horaEstimada.substring(6, 8))

  // Foi adicionado 21 nas horas por conta do fuso horário que é de -3
  let segundosAtuais = new Date(1970, 0, 0, (hora + 21), minutos, segundos, 0).getTime() / 1000
  let segundosEstimados = new Date(1970, 0, 0, (hEstimada + 21), mEstimado, sEstimado, 0).getTime() / 1000

  let resultado = parseInt((segundosAtuais * 100) / segundosEstimados)

  return resultado
}

exports.cronometro = (dataInicial, pausado, tempoCronometro, tempoEstimadaParam) => {
  if (dataInicial === undefined && pausado === undefined && tempoCronometro === undefined && tempoEstimadaParam === undefined) {
    dataInicial = new Date().toISOString()
    pausado = true
    tempoCronometro = '00:00:00'
    tempoEstimadaParam = '00:00:00'
  }

  horaSalva = tempoCronometro

  horaEstimada = tempoEstimadaParam

  let dataAtual = new Date().toISOString()

  if (!pausado) {
    let segundos = calculaSegundos(dataInicial, pausado, dataAtual)
    let minutos = calculaMinutos(dataInicial, pausado, dataAtual)
    let hora = calculaHoras(dataInicial, pausado, dataAtual)
    let cronometro = somaHoras(hora, minutos, segundos)
    let porcentagem = porcentagemHoras(dataInicial, cronometro)
    return {
      cronometro,
      porcentagem
    }
  } else {
    return horaSalva
  }
}

