const board = [
  {
    id: 'f02', value: undefined,
  },
  {
    id: 'f12', value: undefined,
  },
  {
    id: 'f22', value: undefined,
  },
  {
    id: 'f01', value: undefined,
  },
  {
    id: 'f11', value: undefined,
  },
  {
    id: 'f21', value: undefined,
  },
  {
    id: 'f00', value: undefined,
  },
  {
    id: 'f10', value: undefined,
  },
  {
    id: 'f20', value: undefined,
  },
];

const winScenarios = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

let marker = false;

const gameBoard = document.getElementById('board');
const htmlArray = board.map((field, index) => `<div class="grid-item" id="${field.id}" onclick="play(${index})">&nbsp;</div>`);
gameBoard.innerHTML = htmlArray.join('');

const checkTie = () => {
  const tie = board.every((field) => field.value !== undefined);
  if (tie) {
    return alert("It's a tie!!");
  }
};

const checkWin = () => {
  const state = winScenarios.map((indices) => {
    const values = indices.map((index) => board[index].value);
    return values.join('');
  });

  const xWon = state.some((value) => value === 'XXX');
  const oWon = state.some((value) => value === 'OOO');
  if (xWon) {
    return alert('X won!!!');
  } if (oWon) {
    return alert('O won!!!');
  }
  return checkTie();
};

const play = (coordinate) => {
  if (board[coordinate].value !== undefined) {
    return alert('Field occupied!');
  }

  const value = marker ? 'O' : 'X';
  const field = document.getElementById(board[coordinate].id);
  field.innerText = value;
  board[coordinate].value = value;

  marker = !marker;

  setTimeout(() => checkWin(), 10);
};

const reset = () => {
  const confirmation = confirm('Are you sure?');
  if (confirmation) {
    board.forEach((field) => {
      field.value = undefined;
      const domField = document.getElementById(field.id);
      domField.innerHTML = '&nbsp;';
      marker = false;
    });
  }
};
