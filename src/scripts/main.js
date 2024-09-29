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
let rowStep = 0;
let cellStep = 0;
let rows = document.querySelectorAll(".row_div");
let rowCells;
let alphabetRegexPatern = /^[A-Z]+$/;
let letterKeyPress;
const selectedWordIndex = Math.floor(Math.random() * 50);
let selectedWord = wordsList[selectedWordIndex];
console.log(selectedWord);

//? Functions
const deleteCharactersFromRowCells = () => {
  // debugger;
  if (cellStep === 0) return;
  cellStep--;
  if (rowCells[cellStep].innerHTML !== "") {
    // debugger;

    rowCells[cellStep].innerHTML = "";
    rowCells[cellStep].style.backgroundColor = "";
  } else if (rowCells[cellStep - 1].innerHTML === "") {
    // debugger;

    // debugger;
    cellStep--;
    rowCells[cellStep].innerHTML = "";
    rowCells[cellStep].style.backgroundColor = "";
  }
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
  letterKeyPress = letter.key.toUpperCase();
  if (rowStep > 5) return;
  rowCells = rows[rowStep].children;

  if (cellStep === 5 && letter.key === "Enter") {
    if (rowStep > 5) return;
    console.log(cellStep, "enter");

    ++rowStep;
    cellStep = 0;
    return;
  }
  if (cellStep - 1 < rowCells.length && letter.key === "Backspace") {
    deleteCharactersFromRowCells();
    return;
  }

  if (alphabetRegexPatern.test(letterKeyPress) && letterKeyPress.length === 1)
    if (rowStep < rows.length) {
      if (selectedWord[cellStep] === letterKeyPress) {
        rowCells[cellStep].style.backgroundColor = "green";
      } else if (selectedWord.includes(letterKeyPress)) {
        if (cellStep > 4) return;
        rowCells[cellStep].style.backgroundColor = "#FFEE8C";
      }

      if (allCellsAreGreen(rowCells)) {
        alertMessage.textContent = `Successfull "${selectedWord}"`;
        alertBox.style.transform = "translateY(25px)";
        document.removeEventListener(
          "keydown",
          loopOnRowsAndPrintLettersAtCells
        );
      } else if (rowStep === 5 && cellStep >= 4) {
        alertMessage.textContent = `Lose`;
        alertBox.style.transform = "translateY(25px)";
        document.removeEventListener(
          "keydown",
          loopOnRowsAndPrintLettersAtCells
        );
      }

      if (cellStep > 4) return;

      if (cellStep < rowCells.length) {
        cellStep++;
        rowCells[cellStep - 1].innerHTML = letterKeyPress;
      }
    }
};

// const animationsForEnterAndBackspaceBtn = (letter) => {
//   const enter = [letter.key === "Enter"] ?? {};
//   console.log(enter);
// };

//? Add event listener
document.addEventListener("keydown", loopOnRowsAndPrintLettersAtCells);
// document.addEventListener("keydown", animationsForEnterAndBackspaceBtn);
