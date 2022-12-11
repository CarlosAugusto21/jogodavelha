const sellElements = document.querySelectorAll('[data-sell]')
const board = document.querySelector('[data-board]')
const mensagem = document.querySelector('[data-mensagem]')
const resultado = document.querySelector('[data-result]')
const button = document.querySelector('[data-restart]')

let turnoCirculo

const vencedorCombinacoes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const inicioJogo = () => {
  for (const sell of sellElements) {
    sell.classList.remove('o')
    sell.classList.remove('x')
    sell.removeEventListener('click', play)
    sell.addEventListener('click', play, { once: true })
  }
  turnoCirculo = false
  board.classList.add('x')
  resultado.classList.remove('flag-mensagem')
  board.classList.remove('block')
}

const checarVencedor = jogadorVez => {
  return vencedorCombinacoes.some(combinacao => {
    return combinacao.every(index => {
      return sellElements[index].classList.contains(jogadorVez)
    })
  })
}

const checarEmpate = () => {
  return [...sellElements].every(sell => {
    return sell.classList.contains('x') || sell.classList.contains('o')
  })
}

const lugarMarcado = (sell, classAdd) => {
  sell.classList.add(classAdd)
}

const turnos = () => {
  turnoCirculo = !turnoCirculo

  if (turnoCirculo) {
    board.classList.add('o')
  } else {
    board.classList.add('x')
  }
}

const fimJogo = empate => {
  if (empate) {
    mensagem.innerHTML = 'Empate'
  } else {
    mensagem.innerHTML = turnoCirculo ? 'O Venceu!' : 'X Venceu!'
  }
  resultado.classList.add('flag-mensagem')
  board.classList.add('block')
}
const play = e => {
  const sell = e.target
  const classAdd = turnoCirculo ? 'o' : 'x'
  lugarMarcado(sell, classAdd)
  const vencedor = checarVencedor(classAdd)
  const empate = checarEmpate()
  if (vencedor) {
    fimJogo(false)
  } else if (empate) {
    fimJogo(true)
  } else {
    turnos()
  }
}

inicioJogo()

button.addEventListener('click', inicioJogo)
