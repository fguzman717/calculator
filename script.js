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

// Create a function called 'operate' that takes in an operator and two numbers and calls one of the operator functions
function operate(firstNum, selectedOperator, secondNum) {
  firstNum = parseInt(firstNum);
  secondNum = parseInt(secondNum);

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
  zero
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

// Event Listener For Selecting The Numbers
let digitsCollection = document.querySelectorAll(".digits");
digitsCollection.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (!isSecondNum) {
      firstNumDiv.textContent += digit.textContent;
      firstNum = firstNumDiv.textContent;
      console.log(firstNum);
    } else {
      secondNumDiv.textContent += digit.textContent;
      secondNum = secondNumDiv.textContent;
      console.log(secondNum);
    }
  });
});

// Event Listener For Selecting The Operator
let operatorCollection = document.querySelectorAll(".operator-button");
operatorCollection.forEach((operator) => {
  operator.addEventListener("click", () => {
    selectedOperatorDiv.textContent = operator.textContent;
    selectedOperator = selectedOperatorDiv.textContent;
    isSecondNum = true;
    console.log(selectedOperator);
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
});

clearEntry.addEventListener("click", () => {
  if (secondNum) {
    secondNumDiv.textContent = secondNumDiv.textContent.slice(0, -1);
    secondNum = secondNumDiv.textContent;
  } else if (selectedOperator) {
    selectedOperatorDiv.textContent = "";
    selectedOperator = null;
    isSecondNum = false;
  } else {
    firstNumDiv.textContent = firstNumDiv.textContent.slice(0, -1);
    firstNum = firstNumDiv.textContent;
  }
});

// Event Listener For Solving User's Math Problem
equalButton.addEventListener("click", () => {
  firstNumDiv.textContent = `${operate(firstNum, selectedOperator, secondNum)}`;
  firstNum = firstNumDiv.textContent;
  selectedOperatorDiv.textContent = "";
  selectedOperator = null;
  secondNumDiv.textContent = "";
  secondNum = null;
  isSecondNum = false;
});
