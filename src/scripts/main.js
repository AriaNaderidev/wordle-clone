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
let letterKeyPress = "";
let screenKeyBoardBtns = document.querySelectorAll("button[name]");
const selectedWordIndex = Math.floor(Math.random() * wordsList.length);
let selectedWord = wordsList[selectedWordIndex];
console.log(selectedWord);

//? Functions
const deleteCharactersFromRowCells = () => {
  if (cellStep === 0) return;
  cellStep--;
  if (rowCells[cellStep].innerHTML !== "") {
    rowCells[cellStep].innerHTML = "";
    rowCells[cellStep].style.backgroundColor = "";
  } else if (rowCells[cellStep - 1].innerHTML === "") {
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
  console.log(letter);

  if (rowStep > 5) return;

  rowCells = rows[rowStep].children;

  if (alphabetRegexPatern.test(letter) && letter.length === 1) {
    console.log("Entered here 1 -- first condition");

    letterKeyPress = letter;

    if (cellStep < rowCells.length) {
      rowCells[cellStep].innerHTML = letterKeyPress;

      if (selectedWord[cellStep] === letterKeyPress) {
        rowCells[cellStep].style.backgroundColor = "green";
      } else if (selectedWord.includes(letterKeyPress)) {
        rowCells[cellStep].style.backgroundColor = "#FFEE8C";
      }

      cellStep++;
      letterKeyPress = "";
    }

    if (allCellsAreGreen(rowCells)) {
      alertMessage.textContent = `Successfull "${selectedWord}"`;
      alertBox.style.transform = "translateY(25px)";
      document.removeEventListener("keydown", loopOnRowsAndPrintLettersAtCells);
    } else if (rowStep === 5 && cellStep > 4) {
      alertMessage.textContent = `Lose`;
      alertBox.style.transform = "translateY(25px)";
      document.removeEventListener("keydown", loopOnRowsAndPrintLettersAtCells);
    }
  } else if (letter === "ENTER") {
    console.log("PRESSED ENTER");

    letterKeyPress = "";
    console.log(letterKeyPress);

    if (cellStep === 5) {
      rowStep++;
      cellStep = 0;
      letterKeyPress = "";
    }
    return;
  } else if (letter === "BACKSPACE") {
    deleteCharactersFromRowCells();
  }
  letter = "";
};

//? Add event listener
document.addEventListener("keydown", (event) =>
  loopOnRowsAndPrintLettersAtCells(event.key.toUpperCase())
);

// screenKeyBoardBtns.forEach((btn) => {
//   btn.addEventListener("click", (event) => {
//     let keyValue = event.target.name.toUpperCase();

//     // if (alphabetRegexPatern.test(keyValue)) {
//     //   if (cellStep > 5) return;
//     //   loopOnRowsAndPrintLettersAtCells(keyValue);
//     //   letterKeyPress = "";
//     // }

//     let keyPressEvent = new KeyboardEvent("keypress", {
//       key: keyValue,
//       code: `Key${keyValue}`,
//       keyCode: keyValue.charCodeAt(0),
//       bubbles: true,
//     });

//     keyValue = "";

//     document.dispatchEvent(keyPressEvent);
//     document.removeEventListener("keypress", keyPressEvent);
//   });
// });

screenKeyBoardBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let keyValue = event.target.name.toUpperCase();
    loopOnRowsAndPrintLettersAtCells(keyValue);
  });
});
