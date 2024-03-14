const PLAYFIELD_WIDTH = 10;
const PLAYFIELD_HEIGHT = 20;
const TETROMIN0_NAMES = ["O", "I", "S", "Z", "L", "J", "T"];

const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0],
  ],
  J: [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
};

function convertToIndex(row, column) {
  return row * PLAYFIELD_WIDTH + column;
}

let playfield;
let tetromino;

function generatePlayField() {
  for (let y = 0; y < PLAYFIELD_HEIGHT * PLAYFIELD_WIDTH; y++) {
    const cell = document.createElement("div");
    document.querySelector(".grid").append(cell);
  }
  playfield = new Array(PLAYFIELD_HEIGHT)
    .fill()
    .map(() => new Array(PLAYFIELD_WIDTH).fill(0));
}

function getRandomTetromino() {
  const tetrominoNames = Object.keys(TETROMINOES);
  const randomIndex = Math.floor(Math.random() * tetrominoNames.length);
  const randomTetrominoName = tetrominoNames[randomIndex];
  const randomTetrominoMatrix = TETROMINOES[randomTetrominoName];
  return {
    name: randomTetrominoName,
    matrix: randomTetrominoMatrix,
    column: Math.floor((PLAYFIELD_WIDTH - randomTetrominoMatrix[0].length) / 2),
    row: 0,
  };
}

function generateTetromino() {
  tetromino = getRandomTetromino();
}

generatePlayField();
generateTetromino();

const cells = document.querySelectorAll(".grid div");

const drawPlayField = () => {
  for (let row = 0; row < PLAYFIELD_HEIGHT; row++) {
    for (let column = 0; column < PLAYFIELD_WIDTH; column++) {
      if (playfield[row][column] == 0) continue;
      const name = playfield[row][column];
      const cellIndex = convertToIndex(row, column);
    }
  }
};

function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetromino.matrix[row].length; column++) {
      if (tetromino.matrix[row][column] === 0) continue;
      const cellIndex = convertToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

function clearCells() {
  cells.forEach((cell) => {
    cell.removeAttribute("class");
  });
}

function draw() {
  clearCells();
  drawPlayField();
  drawTetromino();
}

draw();

document.addEventListener("keydown", onKeyDown);

function onKeyDown(event) {
  switch (event.keyCode) {
    case 40:
      tetromino.row++;
      break;
    case 37:
      if (isValid(tetromino.row, tetromino.column - 1)) {
        tetromino.column--;
      }
      break;
    case 39:
      if (isValid(tetromino.row, tetromino.column + 1)) {
        tetromino.column++;
      }
      break;
  }
  draw();
}

function isValid(newRow, newColumn) {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (
        tetromino.matrix[row][column] &&
        (newColumn + column < 0 ||
          newColumn + column >= PLAYFIELD_WIDTH ||
          newRow + row >= PLAYFIELD_HEIGHT)
      ) {
        return false;
      }
    }
  }
  return true;
}
