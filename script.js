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

// Operators Buttons
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

// Buttons For The Digits and The Decimal
let digitContainer = document.createElement("div");
digitContainer.setAttribute("id", "digit-container");
body.appendChild(digitContainer);

const digits = "1234567890".split("");
digits.forEach((digit) => {
  const button = document.createElement("button");
  button.classList.add("digits");
  button.textContent = digit;
  digitContainer.appendChild(button);
});

const decimal = document.createElement("button");
decimal.classList.add("decimal");
decimal.textContent = ".";
digitContainer.appendChild(decimal);

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

// Functions For Each Individual Event Handler
function handleDigitEvent(digit) {
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
    firstNumDiv.textContent += digit;
    firstNum = firstNumDiv.textContent;
  } else {
    secondNumDiv.textContent += digit;
    secondNum = secondNumDiv.textContent;
  }
}

function handleDecimalEvent(decimal) {
  if (isError || previousCalc) {
    firstNumDiv.textContent = "0";
    selectedOperatorDiv.textContent = "";
    secondNumDiv.textContent = "";
    isError = false;
    previousCalc = false;
    firstHasDecimal = false;
    secondHasDecimal = false;
  }

  let currentDiv = !isSecondNum ? firstNumDiv : secondNumDiv;
  let currentHasDecimal = !isSecondNum ? firstHasDecimal : secondHasDecimal;

  if (currentHasDecimal) {
    return;
  }

  if (currentDiv.textContent === "") {
    currentDiv.textContent = "0";
  }

  currentDiv.textContent += decimal;

  if (!isSecondNum) {
    firstNum = currentDiv.textContent;
    firstHasDecimal = true;
  } else {
    secondNum = currentDiv.textContent;
    secondHasDecimal = true;
  }
}

function handleOperatorEvent(operator) {
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
  selectedOperatorDiv.textContent = operator;
  selectedOperator = selectedOperatorDiv.textContent;
  isSecondNum = true;
}

function handleClearAllEvent() {
  firstNumDiv.textContent = "";
  firstNum = null;
  selectedOperatorDiv.textContent = "";
  selectedOperator = null;
  secondNumDiv.textContent = "";
  secondNum = null;
  isSecondNum = false;
  firstHasDecimal = false;
  secondHasDecimal = false;
}

function handleClearEntryEvent() {
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
}

function handleSolveEvent() {
  firstNum = Number(firstNum);
  secondNum = Number(secondNum);

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
}

// Event Listener For Keyboard Inputs
document.addEventListener("keydown", (event) => {
  const digitKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const decimalKey = ".";
  const operatorKeys = ["+", "-", "*", "/"];
  const clearEntryKey = "Backspace";
  const clearAllKey = "Escape";
  const solveKey = ["=", "Enter"];

  console.log(event.key);
  if (digitKeys.includes(event.key)) {
    handleDigitEvent(event.key);
  } else if (decimalKey.includes(event.key)) {
    handleDecimalEvent(event.key);
  } else if (operatorKeys.includes(event.key)) {
    handleOperatorEvent(event.key);
  } else if (solveKey.includes(event.key)) {
    handleSolveEvent();
  } else if (clearAllKey.includes(event.key)) {
    handleClearAllEvent();
  } else if (clearEntryKey.includes(event.key)) {
    handleClearEntryEvent();
  }
});

// Event Listener For Selecting The Numbers and Decimals
let digitsCollection = document.querySelectorAll(".digits");
digitsCollection.forEach((digit) => {
  digit.addEventListener("click", () => {
    handleDigitEvent(digit.textContent);
  });
});

// Event Listener For Using Decimal Points
decimal.addEventListener("click", () => {
  handleDecimalEvent(decimal.textContent);
});

// Event Listener For Selecting The Operator
let operatorCollection = document.querySelectorAll(".operator-button");
operatorCollection.forEach((operator) => {
  operator.addEventListener("click", () => {
    handleOperatorEvent(operator.textContent);
  });
});

// Event Listeners For The Clear Buttons
clearAll.addEventListener("click", () => {
  handleClearAllEvent();
});

clearEntry.addEventListener("click", () => {
  handleClearEntryEvent();
});

// Event Listener For Solving User's Math Problem
equalButton.addEventListener("click", () => {
  handleSolveEvent();
});
