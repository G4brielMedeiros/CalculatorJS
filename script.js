// Constants for DOM elements.
const digitsDOM     = document.querySelectorAll(".digit");
const operatorsDOM  = document.querySelectorAll(".operator");
const displayDOM    = document.getElementById("expression");
const dotDOM        = document.getElementById("dot");
const acDOM         = document.getElementById("ac");
const equalsDOM     = document.getElementById("equals");
const signalDOM     = document.getElementById("signal");
const percentDOM    = document.getElementById("percent");

// Memory.
let operator;
let mustEraseDisplay;
let numX;
let numY;

// Helper functions for cleaner code.
const hasDot            = (...strings) => strings.every((string) => string.includes("."));
const isUnderIntLimit   = (string) => hasDot(string) && string.substr(string.indexOf(".")).length < 9;
const isUnderFloatLimit = (string) => string.length < 9;
const isUnderLimits     = (string) => isUnderFloatLimit(string) || isUnderIntLimit(string);
const addDigit          = (update) => displayDOM.textContent += update;

// Validates a mathematical expression of [x operator y].
function operate(operator, x, y) {

  let result = 0;

  switch (operator) {
    case "+":
      result = x + y;
      break;

    case "-":
      result = x - y;
      break;

    case "×":
      result = x * y;
      break;

    case "÷":
      result = x / y;
      break;

    default:
      result = x;
      break;
  }

  return result == Infinity ? "bruh" : Math.round(result * 10000) / 10000;
}



// Adds a digit to the display validated by length rules.
function updateDisplay(digitDOM) {
  return () => {

    if (mustEraseDisplay) {
      displayDOM.textContent = ""; 
      mustEraseDisplay = false;
    }

    const DIGIT = digitDOM.textContent;
    const DISPLAY = displayDOM.textContent;

    if (hasDot(DIGIT, DISPLAY)) return;

    if (hasDot(DIGIT)) DISPLAY.length == 0 ? addDigit("0.") : addDigit(".");
    else if (isUnderLimits(DISPLAY)) addDigit(DIGIT);
  };
}



// Sets up [x operator] to be ready for [y].
function setupOperation(operatorDOM) {
  return () => {
    
    //Clear previous operation
    if (operator) operator.classList = "button operator";
    if (numY) numY = null;


    numX = Number(displayDOM.textContent);   
    operator = operatorDOM;
    operatorDOM.classList += " pressed";

    mustEraseDisplay = true;
  };
}



// Resets the calculator.
const clearMemory = () => {

  if (displayDOM.textContent == "") return;
  if (operator) operator.classList = "button operator";

  displayDOM.textContent = "";
  
  numX = null;
  numY = null;
  operator = null;
  console.log(numX, numY, operator);
};



const calculate = () => {


  if (operator) {
    if (!numY)
      numY = Number(displayDOM.textContent);

    console.log(numX, operator.textContent, numY);

    numX = operate(operator.textContent, numX, numY);

    displayDOM.textContent = numX;

    operator.classList = "button operator";
  }


};



const swapSignal = () => {

  const DISPLAY = displayDOM.textContent;

  if (DISPLAY.charAt(0) == "-") {
    displayDOM.textContent = DISPLAY.substr(1);
    numX *= -1;

  }
  else if (DISPLAY != "" && DISPLAY != 0) {
    displayDOM.textContent = "-" + DISPLAY;
    numX *= -1;
  }

};



const percent = () => {
  
  displayDOM.textContent = Number(displayDOM.textContent) / 100;
}



// Adds event listeners to DOM elements.
function addEventListeners() {
  
  digitsDOM.forEach((digitDOM) => 
    digitDOM.addEventListener("click", updateDisplay(digitDOM))
  );

  operatorsDOM.forEach((operatorDOM) => 
    operatorDOM.addEventListener("click", setupOperation(operatorDOM))
  );

  acDOM.addEventListener("click", clearMemory);

  equalsDOM.addEventListener("click", calculate);

  signalDOM.addEventListener("click", swapSignal);

  percentDOM.addEventListener("click", percent);

}

addEventListeners();

//module.exports = operate;