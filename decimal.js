let x,
  topPosition = -1,
  ar = [],
  power = 1;
let operationFlag = false,
  valueFlag = false,
  pointFlag = false,
  answeredFlag = false;
let operator = "",
  expression = "";
function showValue(x) {
  if (answeredFlag) {
    ar = [];
    topPosition = -1;
    expression = "";
    valueFlag = false;
    operationFlag = false;
    pointflag = false;
    power = 1;
    answeredFlag = false;
  }
  expression += x;
  if (x == "." && !pointFlag) {
    if (ar.length === 0) {
      ++topPosition;
      ar[topPosition] = 0.0;
    }
    pointFlag = true;
  } else {
    if (pointFlag) {
      ar[topPosition] = ar[topPosition] + x / 10 ** power;
      console.log(x / 10 ** power, ar[topPosition]);
      power++;
    } else if (valueFlag) {
      ar[topPosition] = ar[topPosition] * 10 + x;
    } else {
      ++topPosition;
      ar[topPosition] = x;
      valueFlag = true;
    }
  }
  operationFlag = false;
  document.getElementById("showhere").value = expression;
  console.log(ar);
}
function showOperation(operator) {
  answeredFlag = false;
  power = 0;
  expression += operator;
  if (operationFlag) {
    ar[topPosition] = operator;
    expression = expression.slice(0, expression.length - 2) + operator;
  } else {
    ++topPosition;
    ar[topPosition] = operator;
  }
  pointFlag = false;
  operationFlag = true;
  valueFlag = false;
  document.getElementById("showhere").value = expression;
  console.log(ar[topPosition]);
  console.log(ar);
}
function computeAnswer() {
  if (ar.length > 1) {
    ar = performCalculation();
  }
  topPosition = 0;
  ar[0] = parseFloat(ar[0].toFixed(2));
  document.getElementById("showhere").value = ar[0];
  console.log(ar);
  expression = "" + ar[0];
  answeredFlag = true;
}
function performCalculation() {
  let value = ar[0],
    i;
  for (i = 1; i < ar.length; i += 2) {
    operator = ar[i];
    value2 = ar[i + 1];
    if (operator === "+") {
      value = value + value2;
    } else if (operator === "-") {
      value = value - value2;
    } else if (operator === "*") {
      value = value * value2;
    } else if (operator === "/") {
      value = value / value2;
    }
  }
  return [value];
}
function clearAll() {
  ar = [];
  power = 1;
  expression = "";
  topPosition = -1;
  answeredFlag = false;
  operationFlag = false;
  valueFlag = false;
  document.getElementById("showhere").value = 0;
  console.log(ar);
}
