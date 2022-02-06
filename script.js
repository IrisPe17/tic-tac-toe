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

let marker = false; // X
let vsPc = false;
let player = false; // X
let playerMove = true;

const gameBoard = document.getElementById('board');
const htmlArray = board.map((field, index) => `<div class="grid-item" id="${field.id}" onclick="play(${index})">&nbsp;</div>`);
gameBoard.innerHTML = htmlArray.join('');

const checkTie = () => {
  const tie = board.every((field) => field.value !== undefined);
  if (tie) {
    return alert("It's a tie!!");
  }

  playerMove = !playerMove;

  if (vsPc && !playerMove) {
    return playPc();
  }
};

const getBoardState = () => winScenarios.map((indices) => {
  const values = indices.map((index) => board[index].value);
  return values.join('');
});

const checkWin = () => {
  const state = getBoardState();

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

  return setTimeout(() => checkWin(), 100);
};

const playPc = () => {
  // can I win
  const pc = !player;
  const winChars = pc ? 'OO' : 'XX';
  const loseChars = !pc ? 'OO' : 'XX';

  const state = getBoardState();
  const win = state.indexOf(winChars);
  if (win > -1) {
    const indices = winScenarios[win];
    const index = indices.filter((i) => board[i].value === undefined);
    setTimeout(() => play(index[0]), 500);
    return;
  }
  // can I lose
  const lose = state.indexOf(loseChars);
  if (lose > -1) {
    const indices = winScenarios[lose];
    const index = indices.filter((i) => board[i].value === undefined);
    setTimeout(() => play(index[0]), 500);
    return;
  }
  // play()
  const possibleFields = board.reduce((availableFields, field, index) => {
    if (field.value === undefined) {
      availableFields.push({ ...field, index });
    }
    return availableFields;
  }, []);

  possibleFields.sort(() => Math.random() > 0.5 ? 1 : -1);

  setTimeout(() => play(possibleFields[0].index), 500);
};

const newGameVsPc = () => {
  if (!vsPc) {
    return;
  }

  const rnd = Math.random();
  if (rnd >= 0.5) {
    player = true; // O
    playerMove = false;
    alert("PC plays first!");
    playPc();
  } else {
    player = false;
    playerMove = true;
    alert("You go first!");
  }
};

const reset = (isAgainstPc = false) => {
  const confirmation = confirm('Are you sure?');
  if (confirmation) {
    board.forEach((field) => {
      field.value = undefined;
      const domField = document.getElementById(field.id);
      domField.innerHTML = '&nbsp;';
      marker = false;
    });
    vsPc = isAgainstPc;

    if (isAgainstPc) {
      newGameVsPc();
    }
  }
};
