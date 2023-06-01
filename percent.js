let x,
  topPosition = -1,
  ar = [];
let operationFlag = false,
  valueFlag = false,
  answeredFlag = false,
  percentflag = false;
let operator = "",
  expression = "";
function showValue(x) {
  if (answeredFlag) {
    ar = [];
    topPosition = -1;
    expression = "";
    answeredFlag = false;
  }
  if( percentflag)
  {
    expression = x; //means change %key number to new number that's been entered
    valueFlag = false;
    ar = [];
    topPosition =-1;
    percentflag = false;
  }
  else{
    expression += x;
  }
  if (valueFlag) {
    ar[topPosition] = ar[topPosition] * 10 + x;
  } 
  else {
    ++topPosition;
    ar[topPosition] = x;
    valueFlag = true;
  }
  operationFlag = false;
  document.getElementById("showhere").value = expression;
  console.log(ar);
}
function showOperation(operator) {
  console.log(topPosition);
  answeredFlag = false;
  
  //if(valueFlag || operationFlag ){
  if (!operationFlag && operator === "%") {
    ar = percentKeyCalcultion();
    expression = ""+ ar[0];
    topPosition = 0;
    percentflag = true;
  } 
  else {
    percentflag = false;
    if (ar.length >= 3) {
      ar = performCalculation(ar[0], ar[1], ar[2]);
      topPosition = 0;
      expression = ""+ar[0];
    }
    if (operationFlag) {
      ar[topPosition] = operator;
      expression = expression.slice(0, expression.length - 1) + operator;
    } else {
      ++topPosition;
      ar[topPosition] = operator;
      expression += operator;
    }
    operationFlag = true;
    valueFlag = false;
  }
  document.getElementById("showhere").value = expression;
  console.log(ar[topPosition]);
  console.log(ar);
  //}
}
function computeAnswer() {
  if (ar.length > 1) {
    ar = performCalculation(ar[0], ar[1], ar[2]);
  }

  topPosition = 0;
  document.getElementById("showhere").value = ar[0].toFixed(2);
  console.log(ar);
  answeredFlag = true;
  valueFlag = false;
  operationFlag = false;
  expression = "" + ar[0];
}
function percentKeyCalcultion() {
  let value = 0;
  if (ar.length > 1) {
    value = performCalculation(ar[0], ar[1], (ar[0] * ar[2]) / 100);
  } else if (ar.length == 1) {
    value = ar[0] / 100;
  }
  return [value];
}
function performCalculation(value1, operator, value2) {
  let value = 0;
  if (operator === "+") {
    value = value1 + value2;
  } else if (operator === "-") {
    value = value1 - value2;
  } else if (operator === "*") {
    value = value1 * value2;
  } else if (operator === "/") {
    value = value1 / value2;
  }
  return [value];
}
function clearAll() {
  ar = [];
  expression = "";
  topPosition = -1;
  answeredFlag = false;
  operationFlag = false;
  valueFlag = false;
  document.getElementById("showhere").value = 0;
  console.log(ar);
}
