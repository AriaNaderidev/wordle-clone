let printTypedLetter;
let tableDivs = document.querySelectorAll(".table_div");
console.log(tableDivs);
let tableDiv;

document.addEventListener(
  "keypress",
  (printTypedLetter = (btn) => {
    const keyPress = btn.key;
    for (let index = 0; index < tableDivs.length; index++) {
      tableDiv = tableDivs[index];
      tableDivs[index].innerHTML = `${keyPress}`;
    }
  })
);

console.log(tableDiv);
