let currentInput = "";
let previousInput = "";
let operator = "";
let resultDisplayed = false;
const MAX_LENGTH = 17; 

// Function to handle number button clicks
function clickButton(id) {
  if (resultDisplayed) {
    currentInput = ""; // Clear current input after result is shown
    resultDisplayed = false;
  }

  // Prevent input length from exceeding the limit
  if (currentInput.length >= MAX_LENGTH) return;

  currentInput += id;
  document.getElementById("result-disp").innerText = currentInput;
}

// Function to handle operator button clicks
function calculations(op) {
  if (currentInput === "") return; // If no number is entered, do nothing
  if (previousInput !== "") {
    equate(); // Calculate if there's already an operator
  }
  operator = op; 
  previousInput = currentInput;
  currentInput = "";

  console.log(currentInput)
}

// Function to handle the equal button and calculate result
function equate() {
  let result;
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  if (isNaN(num1) || isNaN(num2)) return; // If either number is invalid, exit

  switch (operator) {
    case "add":
      result = num1 + num2;
      break;
    case "sub":
      result = num1 - num2;
      break;
    case "mul":
      result = num1 * num2;
      break;
    case "div":
      result = num1 / num2;
      break;
    default:
      return;
  }

   // Convert result to string and check its length
  let resultString = result.toString();

  // Limit the length of the result to 18 characters
  if (resultString.length > MAX_LENGTH) {
    resultString = resultString.slice(0, MAX_LENGTH);
  }

  document.getElementById("result-disp").innerText = result;
  previousInput = result;
  currentInput = "";
  operator = "";
  resultDisplayed = true;
}

// Function to handle the delete button
function del() {
  currentInput = currentInput.slice(0, -1); // Remove last character
  document.getElementById("result-disp").innerText = currentInput || "0"; // Show 0 if empty
}

// Add keyboard support
document.addEventListener('keydown', function (event) {
  const key = event.key;

  // Handle number keys
  if (!isNaN(key)) {
    clickButton(key);
  }

  // Handle operator keys
  if (key === '+') {
    calculations('add');
  } else if (key === '-') {
    calculations('sub');
  } else if (key === '*') {
    calculations('mul');
  } else if (key === '/') {
    calculations('div');
  }

  // Handle Enter key for equal (=)
  if (key === 'Enter') {
    equate();
  }

  // Handle Backspace for delete
  if (key === 'Backspace') {
    del();
  }

  // Handle period for decimal point
  if (key === '.') {
    clickButton('.');
  }
});