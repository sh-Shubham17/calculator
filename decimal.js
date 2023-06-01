let x,
  topPosition = -1,
  ar = [],
  power = 1;
let operationFlag = false,
  valueFlag = false,
  pointFlag = false,
  answeredFlag = false;
let expression = "";
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
      ar[topPosition] = ar[topPosition] + x/(10 ** power);
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
  power = 1;
  
  if (operationFlag) {
    ar[topPosition] = operator;
    expression = expression.slice(0, expression.length - 1) + operator;
  } else {
    ++topPosition;
    ar[topPosition] = operator;
    expression += operator;
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
  console.log(ar[0]);
  ar[0] = parseFloat(ar[0].toFixed(2));
  document.getElementById("showhere").value = ar[0];
  console.log(ar);
  expression = "" + ar[0];
  answeredFlag = true;
}
function performCalculation() {
  let i, new_ar = [], 
  new_topPosition = 0; //local position pointer for array new_ar
  /* why we need new_ar to perform * and / divide operations first 
  then performing + & - in 2nd turn;*/
  new_ar[new_topPosition] = ar[0];
  for (i = 1; i < ar.length; i += 1) {
    //console.log( ar[i],ar[i] === '*' )
    if (ar[i] === '*') {
      new_ar[new_topPosition] = new_ar[new_topPosition] * ar[i+1];
      //console.log(new_ar[new_topPosition] );
    } 
    else if (ar[i] === '/') {
      new_ar[new_topPosition] = new_ar[new_topPosition] * ar[i+1];
      //console.log(new_ar[new_topPosition] );
    }
    else
    {
      new_topPosition++;
      new_ar[new_topPosition] = ar[i];
    }
  }
  let operator = "";
  value = new_ar[0];
  for (i = 1; i < new_ar.length; i += 2) {
    operator = new_ar[i];
    if (operator === "+") {
      value = value + new_ar[i+1] ;
    } 
    else if (operator === "-") {
      value = value - new_ar[i+1];
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
