//? Variable
const wordsList = [
  "APPLE",
  "BREAD",
  "CHAIR",
  "DANCE",
  "EAGLE",
  "FLAME",
  "GRAPE",
  "HOUSE",
  "INPUT",
  "JELLY",
  "KNIFE",
  "LEMON",
  "MANGO",
  "NIGHT",
  "OCEAN",
  "PEARL",
  "QUEEN",
  "RADIO",
  "SUGAR",
  "TABLE",
  "UMBRA",
  "VIGOR",
  "WATER",
  "XENON",
  "YACHT",
  "ZEBRA",
  "BRAVE",
  "CLOUD",
  "DAISY",
  "EARTH",
  "FENCE",
  "GLOBE",
  "HONEY",
  "IVORY",
  "JOLLY",
  "KINDY",
  "LASER",
  "MOUSE",
  "NOBLE",
  "OLIVE",
  "PIANO",
  "QUEST",
  "RESET",
  "SMILE",
  "TIGER",
  "UNITY",
  "VOCAL",
  "WHALE",
  "XYLAN",
  "YUMMY",
  "ZESTY",
];
let alertBox = document.querySelector("#alert-box");
let alertMessage = document.querySelector("#alert-message");
let resetGameBtn = document.querySelector("#reset-game");
let rowStep = 0;
let cellStep = 0;
let rows = document.querySelectorAll(".row_div");
let rowCells;
let alphabetRegexPatern = /^[A-Z]+$/;
let screenKeyBoardBtns = document.querySelectorAll("button[name]");
let selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)];

//?Functions
const deleteCharactersFromRowCells = () => {
  if (cellStep === 0) return;
  cellStep--;
  if (rowCells[cellStep].innerHTML !== "") {
    rowCells[cellStep].innerHTML = "";
    rowCells[cellStep].style.backgroundColor = "";
  } else if (cellStep > 0 && rowCells[cellStep - 1].innerHTML === "") {
    cellStep--;
    rowCells[cellStep].innerHTML = "";
    rowCells[cellStep].style.backgroundColor = "";
  }
};

console.log(selectedWord);

const resetGame = () => {
  rowStep = 0;
  cellStep = 0;
  selectedWord = "";
  rows.forEach((row) => {
    Array.from(row.children).forEach((cell) => {
      cell.innerHTML = "";
      cell.style.backgroundColor = "";
    });
  });

  alertBox.style.transform = "translateY(-100%)";
  alertMessage.textContent = "";

  selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)];

  console.log(selectedWord);

  removeEventListeners();
  addEventListeners();
  resetGameBtn.style.display = "none";
};

const allCellsAreGreen = (rowCells) => {
  for (let i = 0; i < rowCells.length; i++) {
    if (rowCells[i].style.backgroundColor !== "green") {
      return false;
    }
  }
  return true;
};

const loopOnRowsAndPrintLettersAtCells = (letter) => {
  rowCells = rows[rowStep].children;

  if (alphabetRegexPatern.test(letter) && letter.length === 1) {
    if (cellStep < rowCells.length) {
      rowCells[cellStep].innerHTML = letter;

      if (selectedWord[cellStep] === letter) {
        rowCells[cellStep].style.backgroundColor = "green";
      } else if (selectedWord.includes(letter)) {
        rowCells[cellStep].style.backgroundColor = "#FFEE8C";
      }

      cellStep++;
    }

    if (allCellsAreGreen(rowCells)) {
      alertMessage.textContent = `Successful "${selectedWord}"`;
      alertBox.style.transform = "translateY(25px)";
      resetGameBtn.style.display = "block";
      removeEventListeners();
    } else if (rowStep === 5 && cellStep > 4) {
      resetGameBtn.style.display = "block";
      alertMessage.textContent = `Lose`;
      alertBox.style.transform = "translateY(25px)";
      removeEventListeners();
    }
  } else if (letter === "ENTER") {
    if (cellStep === 5) {
      rowStep++;
      cellStep = 0;
    }
  } else if (letter === "BACKSPACE") {
    deleteCharactersFromRowCells();
  }
};

//? Event Listeners
const handleKeyDown = (event) => {
  event.preventDefault();
  loopOnRowsAndPrintLettersAtCells(event.key.toUpperCase());
};

const handleButtonClick = (event) => {
  event.preventDefault();
  const keyValue = event.target.name.toUpperCase();
  loopOnRowsAndPrintLettersAtCells(keyValue);
};

const addEventListeners = () => {
  document.addEventListener("keydown", handleKeyDown);
  screenKeyBoardBtns.forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
  });
};

const removeEventListeners = () => {
  document.removeEventListener("keydown", handleKeyDown);
  screenKeyBoardBtns.forEach((btn) => {
    btn.removeEventListener("click", handleButtonClick);
  });
};

resetGameBtn.addEventListener("click", resetGame);

//? Initialize the game
addEventListeners();
