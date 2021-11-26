const digitsDOM = document.querySelectorAll(".digit");
const operatorsDOM = document.querySelectorAll(".operator");
const displayDOM = document.getElementById("expression");
const dotDOM = document.getElementById("dot");
const acDOM = document.getElementById("ac");

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

const hasDot            = (...strings) => strings.every((string) => string.includes("."));
const isUnderIntLimit   = (string) => hasDot(string) && string.substr(string.indexOf(".")).length < 9;
const isUnderFloatLimit = (string) => string.length < 9;
const isUnderLimits     = (string) => isUnderFloatLimit(string) || isUnderIntLimit(string);
const addDigit          = (update) => displayDOM.textContent += update;

let displayedOperand = "";

function getDigit(digitDOM) {
  return () => {

    const DIGIT = digitDOM.textContent;
    const DISPLAY = displayDOM.textContent;

    if (hasDot(DIGIT, DISPLAY)) return;

    if (hasDot(DIGIT)) DISPLAY.length == 0 ? addDigit("0.") : addDigit(".");
    else if (isUnderLimits(DISPLAY)) addDigit(DIGIT);
  };
}





let operator;
let numX;
let numY;



function setupOperation(operatorDOM) {
  return () => {

    if (operator) operator.classList = "button operator";

    numX = Number(displayDOM.textContent);   
    operator = operatorDOM;
    operatorDOM.classList += " pressed";
    console.log(numX + " " + operator.textContent);
  };
}


function clearMemory() {
  return () => {
    
    displayDOM.textContent = "";
    operator.classList = "button operator";
    numY, numX, operator = null;
  };
}


digitsDOM.forEach((digitDOM) => 
  digitDOM.addEventListener("click", getDigit(digitDOM))
);


operatorsDOM.forEach((operatorDOM) => 
  operatorDOM.addEventListener("click", setupOperation(operatorDOM))
);


acDOM.addEventListener("click", clearMemory());



//module.exports = operate;
