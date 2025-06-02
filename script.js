// The calculator will have the basic math operators (+,-,*,/)
// These operations will be their own functions
function addition(firstNum, secondNum) {
  return firstNum + secondNum;
}

function subtraction(firstNum, secondNum) {
  return firstNum - secondNum;
}

function multiplication(firstNum, secondNum) {
  return firstNum * secondNum;
}

function division(firstNum, secondNum) {
  return firstNum / secondNum;
}

// A calculator operation will consist of 3 variables: The first number, the operator, and the second number (1 + 1)
let firstNum = "";
let selectedOperator = "";
let secondNum = "";
let isSecondNum = false;
let isError = false;
let previousCalc = false;
// let firstHasDecimal = false;
// let secondHasDecimal = false;

// Create a function called 'operate' that takes in an operator and two numbers and calls one of the operator functions
function operate(firstNum, selectedOperator, secondNum) {
  firstNum = Number(firstNum);
  secondNum = Number(secondNum);
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
let calculatorContainer = document.createElement("div");
calculatorContainer.setAttribute("id", "calculator-container");
body.appendChild(calculatorContainer);

// The Display Where Numbers and Solutions Will Be Presented
let display = document.createElement("div");
display.setAttribute("id", "display");
calculatorContainer.appendChild(display);

let firstNumDiv = document.createElement("div");
let selectedOperatorDiv = document.createElement("div");
let secondNumDiv = document.createElement("div");
display.append(firstNumDiv, selectedOperatorDiv, secondNumDiv);

// Clear Buttons
let clearContainer = document.createElement("div");
clearContainer.setAttribute("id", "clear-container");
calculatorContainer.appendChild(clearContainer);

let clearAll = document.createElement("button");
clearAll.classList.add("clear-buttons");
clearAll.textContent = "Clear All";

let clearEntry = document.createElement("button");
clearEntry.classList.add("clear-buttons");
clearEntry.textContent = "Clear Entry";

clearContainer.append(clearAll, clearEntry);

// Operators Buttons
let operatorContainer = document.createElement("div");
operatorContainer.setAttribute("id", "operator-container");
calculatorContainer.append(operatorContainer);

let operators = ["+", "-", "*", "/"];

operators.forEach((operator) => {
  const button = document.createElement("button");
  button.classList.add("operator-button");
  button.textContent = operator;
  operatorContainer.appendChild(button);
});

// Buttons For The Digits, Decimal, and Equals
let digitContainer = document.createElement("div");
digitContainer.setAttribute("id", "digit-container");
calculatorContainer.appendChild(digitContainer);

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

const equalButton = document.createElement("button");
equalButton.classList.add("solution-button");
equalButton.textContent = "=";
digitContainer.appendChild(equalButton);

// Function to Reset All Variables
function resetVariables() {
  firstNum = "";
  secondNum = "";
  selectedOperator = "";
  isSecondNum = false;
  isError = false;
  previousCalc = false;
  firstNumDiv.textContent = "";
  secondNumDiv.textContent = "";
  selectedOperatorDiv.textContent = "";
}
// Functions For Each Individual Event Handler
function handleDigitEvent(digit) {
  if (isError) {
    resetVariables();
  }

  if (!isSecondNum) {
    if (firstNumDiv.textContent.length >= 10) {
      return;
    }
    if (previousCalc) {
      firstNumDiv.textContent = "";
      firstNum = "";
      previousCalc = false;
    }
    firstNumDiv.textContent += digit;
    firstNum = firstNumDiv.textContent;
  } else {
    if (secondNumDiv.textContent.length >= 10) {
      return;
    }
    secondNumDiv.textContent += digit;
    secondNum = secondNumDiv.textContent;
  }
}

function handleDecimalEvent(decimal) {
  if (isError || previousCalc) {
    resetVariables();
    firstNumDiv.textContent = "0";
    previousCalc = false;
  }

  let currentNumber = !isSecondNum ? firstNum : secondNum;

  if (currentNumber.includes(".")) {
    return;
  }

  if (currentNumber === "") {
    currentNumber = "0";
  }

  currentNumber += decimal;

  if (!isSecondNum) {
    firstNum = currentNumber;
    firstNumDiv.textContent = firstNum;
  } else {
    secondNum = currentNumber;
    secondNumDiv.textContent = secondNum;
  }
}

function handleOperatorEvent(operator) {
  if (isError) {
    resetVariables();
  }
  if (firstNum === "") {
    isError = true;
    firstNumDiv.textContent = "Invalid Format Used";
    return;
  }
  selectedOperatorDiv.textContent = operator;
  selectedOperator = selectedOperatorDiv.textContent;
  isSecondNum = true;
}

function handleClearAllEvent() {
  resetVariables();
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
    selectedOperator = "";
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
  if (selectedOperator === "") {
    isError = true;
    firstNumDiv.textContent = "No Operator Selected";
    return;
  }

  if (Number(secondNum) === 0 && selectedOperator === "/") {
    resetVariables();
    isError = true;
    firstNumDiv.textContent = "Cannot Divide By Zero";
    return;
  } else if (secondNum === "") {
    resetVariables();
    isError = true;
    firstNumDiv.textContent = "Invalid Format Used";
    return;
  }

  let solution =
    Math.round(operate(firstNum, selectedOperator, secondNum) * 1000) / 1000;

  if (isNaN(solution)) {
    firstNumDiv.textContent = "Invalid Calculation";
    isError = true;
    return;
  }
  if (solution.toString().length > 10) {
    firstNumDiv.textContent = "Result Too Large!";
    isError = true;
    return;
  }

  firstNumDiv.textContent = `${solution}`;
  firstNum = firstNumDiv.textContent;
  selectedOperatorDiv.textContent = "";
  selectedOperator = "";
  secondNumDiv.textContent = "";
  secondNum = "";
  isSecondNum = false;
  previousCalc = true;
}

// Event Listener For Keyboard Inputs
document.addEventListener("keydown", (event) => {
  const digitKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operatorKeys = ["+", "-", "*", "x", "/"];
  const solveKey = ["=", "Enter"];

  if (digitKeys.includes(event.key)) {
    handleDigitEvent(event.key);
  } else if (event.key === ".") {
    handleDecimalEvent(event.key);
  } else if (operatorKeys.includes(event.key)) {
    handleOperatorEvent(event.key);
  } else if (solveKey.includes(event.key)) {
    handleSolveEvent();
  } else if (event.key === "Escape") {
    handleClearAllEvent();
  } else if (event.key === "Backspace") {
    handleClearEntryEvent();
  } else {
    firstNumDiv.textContent = "Invalid Key Pressed";
    isError = true;
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
