const roundToNearestThousandth = (number) => Math.round(number * 10000) / 10000;

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
      result = (x / y);
      break;

    default:
      result = "error";
      break;
  }

  return result == Infinity ? "bruh" : roundToNearestThousandth(result);
}

module.exports = operate;
