const digitsDOM = document.querySelectorAll(".digit");
const displayDOM = document.getElementById("expression");
const dotDOM = document.getElementById("dot");
const acDOM = document.getElementById("ac");

const displayLimit = 20;

function operate(operator, x, y) {
  let result = 0;

  switch (operator) {
    case "+":
      result = x + y;
      break;

    case "-":
      result = x - y;
      break;

    case "*":
      result = x * y;
      break;

    case "/":
      result = x / y;
      break;

    default:
      result = x;
      break;
  }

  return result == Infinity ? "bruh" : Math.round(result * 10000) / 10000;
}


function displayDigit(digitDOM) {
  return () => {
    const DIGIT = digitDOM.textContent;
    const TEXT = displayDOM.textContent;


    if ( (TEXT.length < displayLimit) && (TEXT.substr(TEXT.indexOf(".")).length != 17) ) {

      if (TEXT.includes(".") && DIGIT.includes(".")) return;

      displayDOM.textContent += DIGIT;
    }

  };
}


Array.from(digitsDOM).map((digitDOM) => {
  digitDOM.addEventListener("click", displayDigit(digitDOM));
});

acDOM.addEventListener("click", () => displayDOM.textContent = "");

module.exports = operate;

console.log(1/3);


