
const board = ['02', '12', '22', '01', '11', '21', '00', '10', '20']
let marker = false

const play = (coordinate) => {
  // if field has value alert, dont change marker value and value
  if (typeof board[coordinate] !== 'string') {
    return alert('Field occupied!')
  }

  const field = document.getElementById(board[coordinate])
  field.innerText = marker ? 'O' : 'X'

  board[coordinate] = marker
  marker = !marker

  console.log(board)
}