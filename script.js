// The calculator will have the basic math operators (+,-,*,/)
// These operations will be their own functions

function addition(firstNum, secondNum) {
  let sum = firstNum + secondNum;
  return sum;
}

function subtraction(firstNum, secondNum) {
  let difference = firstNum - secondNum;
  return difference;
}

function multiplication(firstNum, secondNum) {
  let product = firstNum * secondNum;
  return product;
}

function division(firstNum, secondNum) {
  let quotient = firstNum / secondNum;
  return quotient;
}

// A calculator operation will consist of 3 variables: The first number, the operator, and the second number (1 + 1)
let firstNum = "";
let selectedOperator = "";
let secondNum = "";
let isSecondNum = false;
let isError = false;
let previousCalc = false;
let firstHasDecimal = false;
let secondHasDecimal = false;

// Create a function called 'operate' that takes in an operator and two numbers and calls one of the operator functions
function operate(firstNum, selectedOperator, secondNum) {
  // firstNum = parseInt(firstNum);
  // secondNum = parseInt(secondNum);

  if (selectedOperator === "+") {
    return addition(firstNum, secondNum);
  } else if (selectedOperator === "-") {
    return subtraction(firstNum, secondNum);
  } else if (selectedOperator === "*" || selectedOperator === "x") {
    return multiplication(firstNum, secondNum);
  } else if (selectedOperator === "/") {
    return division(firstNum, secondNum);
  } else {
    return "Error";
  }
}

// Buttons will need to be created for:
// * Each operator
// * Digits
// * Clear button
let body = document.querySelector("body");

// Operators
let operatorContainer = document.createElement("div");
operatorContainer.setAttribute("id", "operator-container");
body.append(operatorContainer);

let addButton = document.createElement("button");
addButton.classList.add("operator-button");
addButton.textContent = "+";

let subtractButton = document.createElement("button");
subtractButton.classList.add("operator-button");
subtractButton.textContent = "-";

let multiplyButton = document.createElement("button");
multiplyButton.classList.add("operator-button");
multiplyButton.textContent = "*";

let divideButton = document.createElement("button");
divideButton.classList.add("operator-button");
divideButton.textContent = "/";

let equalButton = document.createElement("button");
equalButton.classList.add("solution-button");
equalButton.textContent = "=";

operatorContainer.append(
  addButton,
  subtractButton,
  multiplyButton,
  divideButton,
  equalButton
);

// Clear Buttons
let clearContainer = document.createElement("div");
clearContainer.setAttribute("id", "clear-container");
body.appendChild(clearContainer);

let clearAll = document.createElement("button");
clearAll.classList.add("clear-buttons");
clearAll.textContent = "C";

let clearEntry = document.createElement("button");
clearEntry.classList.add("clear-buttons");
clearEntry.textContent = "CE";

clearContainer.append(clearAll, clearEntry);

// Digits **** Try to refactor this with a loop for cleaner code ****
let digitContainer = document.createElement("div");
digitContainer.setAttribute("id", "digit-container");
body.appendChild(digitContainer);

let one = document.createElement("button");
one.classList.add("digits");
one.textContent = "1";

let two = document.createElement("button");
two.classList.add("digits");
two.textContent = "2";

let three = document.createElement("button");
three.classList.add("digits");
three.textContent = "3";

let four = document.createElement("button");
four.classList.add("digits");
four.textContent = "4";

let five = document.createElement("button");
five.classList.add("digits");
five.textContent = "5";

let six = document.createElement("button");
six.classList.add("digits");
six.textContent = "6";

let seven = document.createElement("button");
seven.classList.add("digits");
seven.textContent = "7";

let eight = document.createElement("button");
eight.classList.add("digits");
eight.textContent = "8";

let nine = document.createElement("button");
nine.classList.add("digits");
nine.textContent = "9";

let zero = document.createElement("button");
zero.classList.add("digits");
zero.textContent = "0";

let decimal = document.createElement("button");
decimal.classList.add("decimal");
decimal.textContent = ".";

digitContainer.append(
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  zero,
  decimal
);

// The Display Where Numbers and Solutions Will Be Presented
let display = document.createElement("div");
display.setAttribute("id", "display");
body.prepend(display);

let firstNumDiv = document.createElement("div");
firstNumDiv.textContent = "";
let selectedOperatorDiv = document.createElement("div");
selectedOperatorDiv.textContent = "";
let secondNumDiv = document.createElement("div");
secondNumDiv.textContent = "";

display.append(firstNumDiv, selectedOperatorDiv, secondNumDiv);

// Event Listener For Selecting The Numbers and Decimals
let digitsCollection = document.querySelectorAll(".digits");
digitsCollection.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (isError) {
      firstNumDiv.textContent = "";
      selectedOperatorDiv.textContent = "";
      secondNumDiv.textContent = "";
      isError = false;
    }

    if (!isSecondNum) {
      if (previousCalc) {
        firstNumDiv.textContent = "";
        firstNum = null;
        previousCalc = false;
      }
      firstNumDiv.textContent += digit.textContent;
      firstNum = firstNumDiv.textContent;
    } else {
      secondNumDiv.textContent += digit.textContent;
      secondNum = secondNumDiv.textContent;
    }
  });
});

// Event Listener For Using Decimal Points
decimal.addEventListener("click", () => {
  if (isError || previousCalc) {
    firstNumDiv.textContent = "0";
    selectedOperatorDiv.textContent = "";
    secondNumDiv.textContent = "";
    isError = false;
    previousCalc = false;
  }

  if (firstHasDecimal && !isSecondNum) {
    return;
  } else if (!isSecondNum) {
    if (firstNumDiv.textContent === "") {
      firstNumDiv.textContent = "0";
    }
    firstNumDiv.textContent += decimal.textContent;
    firstNum = firstNumDiv.textContent;
    firstHasDecimal = true;
  } else if (secondHasDecimal) {
    return;
  } else {
    if (secondNumDiv.textContent === "") {
      secondNumDiv.textContent = "0";
    }
    secondNumDiv.textContent += decimal.textContent;
    secondNum = secondNumDiv.textContent;
    secondHasDecimal = true;
  }
});

// Event Listener For Selecting The Operator
let operatorCollection = document.querySelectorAll(".operator-button");
operatorCollection.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (isError) {
      firstNumDiv.textContent = "";
      selectedOperatorDiv.textContent = "";
      secondNumDiv.textContent = "";
      isError = false;
    }
    if (!firstNum) {
      isError = true;
      firstNumDiv.textContent = "Invalid Format Used";
      return;
    }
    selectedOperatorDiv.textContent = operator.textContent;
    selectedOperator = selectedOperatorDiv.textContent;
    isSecondNum = true;
  });
});

// Event Listeners For The Clear Buttons
clearAll.addEventListener("click", () => {
  firstNumDiv.textContent = "";
  firstNum = null;
  selectedOperatorDiv.textContent = "";
  selectedOperator = null;
  secondNumDiv.textContent = "";
  secondNum = null;
  isSecondNum = false;
  firstHasDecimal = false;
  secondHasDecimal = false;
});

clearEntry.addEventListener("click", () => {
  if (secondNum) {
    secondNumDiv.textContent = secondNumDiv.textContent.slice(0, -1);
    secondNum = secondNumDiv.textContent;
    if (!secondNum.includes(".")) {
      secondHasDecimal = false;
    }
  } else if (selectedOperator) {
    selectedOperatorDiv.textContent = "";
    selectedOperator = null;
    isSecondNum = false;
  } else {
    firstNumDiv.textContent = firstNumDiv.textContent.slice(0, -1);
    firstNum = firstNumDiv.textContent;
    if (!firstNum.includes(".")) {
      firstHasDecimal = false;
    }
  }
});

// Event Listener For Solving User's Math Problem
equalButton.addEventListener("click", () => {
  if (secondNum === 0 && selectedOperator === "/") {
    isError = true;
    firstNumDiv.textContent = "You CANNOT Divide By Zero!";
    firstNum = null;
    selectedOperatorDiv.textContent = "";
    selectedOperator = null;
    secondNumDiv.textContent = "";
    secondNum = null;
    isSecondNum = false;
    firstHasDecimal = false;
    secondHasDecimal = false;
    return;
  } else if (!secondNum) {
    isError = true;
    firstNumDiv.textContent = "Invalid Format Used";
    firstNum = null;
    selectedOperatorDiv.textContent = "";
    selectedOperator = null;
    secondNumDiv.textContent = "";
    secondNum = null;
    isSecondNum = false;
    firstHasDecimal = false;
    secondHasDecimal = false;
    return;
  }

  firstNum = Number(firstNum);
  secondNum = Number(secondNum);

  let solution =
    Math.round(operate(firstNum, selectedOperator, secondNum) * 1000) / 1000;

  firstNumDiv.textContent = `${solution}`;
  firstNum = firstNumDiv.textContent;
  selectedOperatorDiv.textContent = "";
  selectedOperator = null;
  secondNumDiv.textContent = "";
  secondNum = null;
  isSecondNum = false;
  firstHasDecimal = false;
  secondHasDecimal = false;
  previousCalc = true;
});
