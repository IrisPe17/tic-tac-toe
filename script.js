
const board = [
  {
    id: '02', value: undefined
  },
  {
    id: '12', value: undefined
  },
  {
    id: '22', value: undefined
  },
  {
    id: '01', value: undefined
  },
  {
    id: '11', value: undefined
  },
  {
    id: '21', value: undefined
  },
  {
    id: '00', value: undefined
  },
  {
    id: '10', value: undefined
  },
  {
    id: '20', value: undefined
  }
]

const winScenarios = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

let marker = false

const play = (coordinate) => {
  if (board[coordinate].value !== undefined) {
    return alert('Field occupied!')
  }

  const value = marker ? 'O' : 'X'
  const field = document.getElementById(board[coordinate].id)
  field.innerText = value

  board[coordinate].value = value
  marker = !marker
  setTimeout(() => checkWin(), 0)
}

const checkWin = () => {
  const state = winScenarios.map((indices) => {
    const values = indices.map((index) => board[index].value)
    return values.join("")
  })

  const xWon = state.some(value => value === 'XXX')
  const oWon = state.some(value => value === 'OOO')
  if (xWon) {
    return alert("X won!!!")
  } else if (oWon) {
    return alert("O won!!!")
  }
  return checkTie()
}

const checkTie = () => {
  const tie = board.every(field => field.value !== undefined)
  if (tie) {
    return alert("It's a tie!!")
  }
}