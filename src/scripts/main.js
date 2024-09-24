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
let rowStep = 0;
let cellStep = 0;
let rows = document.querySelectorAll(".row_div");
let rowCells;
//* the user entered value should obey this Regex pattern
let regex = /^[A-Z]+$/;
let btnPress;
//*creating random numbers for selecting different word from word list each time
const selectedWordIndex = Math.floor(Math.random() * 50);
let selectedWord = wordsList[selectedWordIndex];

//? Functions
const deleteChar = () => {
  //* check if there is letter in cells
  if (cellStep >= 0) {
    rowCells[cellStep].style.backgroundColor = "";
    //*check if the selected cell isn't full
    if (rowCells[cellStep].innerHTML !== "") {
      rowCells[cellStep].innerHTML = "";
    }
    //* check if the selected cell is empty , jump one cell back and then make them empty
    else if (rowCells[cellStep].innerHTML === "") {
      cellStep--;
      rowCells[cellStep].innerHTML = "";
      rowCells[cellStep].style.backgroundColor = "";
    }
  }
};

const loopOnRows = (e) => {
  btnPress = e.key.toUpperCase();
  //*check if a row cells are full and when user clicked on enter jump on next row
  if (cellStep === 4 && e.key === "Enter") {
    ++rowStep;
    cellStep = 0;
    return;
  }
  //*check if user clicked on Backspace , call deleteCell() function
  if (e.key === "Backspace") {
    deleteChar();
    return;
  }
  //*check if the Regex return is true and the value is one letter
  if (regex.test(btnPress) && btnPress.length === 1) {
    if (rowStep < rows.length) {
      rowCells = rows[rowStep].children;
      if (cellStep < 5) {
        for (let i = 0; i < selectedWord.length; i++) {
          //* change cell color to yellow if the lette is true but It isn't at the right index
          if (selectedWord[i] === btnPress) {
            rowCells[cellStep].style.backgroundColor = "#FFEE8C";
            //* change cell color to green if the lette is true and It's at the right index
            if (i === cellStep)
              rowCells[cellStep].style.backgroundColor = "green";
          }
        }
        //*check if It's in cell length
        if (cellStep >= 0 && cellStep <= 4) {
          //* if the last cell isn't empty then ...
          if (cellStep === 4 && rowCells[4].innerHTML !== "") return;
          //*  then fill it and if the cell is not the last one , cell step pluse one
          rowCells[cellStep].innerHTML = btnPress;
          if (cellStep !== 4) cellStep++;
        }
      }
    }
  }
};

//? Add event listener
document.addEventListener("keydown", loopOnRows);
