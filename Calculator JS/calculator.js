const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_div");
const display = document.querySelector(".calculator_result");

keys.addEventListener("click", e => {
 if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    
    // Remove a classe is-depressed de todos os botões
    Array.from(key.parentNode.children).forEach(k => k.classList.remove("is-depressed"))

    // Se o numero no display é 0, é necessario substituir pelo numero pressionado, do contrario
    // deve ser contatenado.
    if (!action) {
        calculator.dataset.previousKey = 'number';

        if (displayedNum === "0" || previousKeyType === 'operator') {
            display.textContent = keyContent;
            calculator.dataset.previousKeyType = "";
        } else {
            display.textContent = displayedNum + keyContent;
        }
    }
      
    if (action === "clear") {
        display.textContent = "0";
        calculator.dataset.previousKey = 'clear'
    }

    if (action === "sum" || action === "subtract" || action === "multiply" || action === "divide") {
        key.classList.add("is-depressed");
        calculator.dataset.previousKeyType = "operator";
        calculator.dataset.firstNumber = displayedNum;
        calculator.dataset.operator = action;
    }

    if (action === 'calculate') {
        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = displayedNum;

        var result = calculate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
        display.textContent = result;
        calculator.dataset.firstNumber = result;
        calculator.dataset.previousKey = 'calculate';
    }
 }
})

function calculate(firstNumber, operator, secondNumber) {
    var result = "";
  
    if (operator === 'sum') {
      result = sum(firstNumber, secondNumber);
    } else if (operator === 'subtract') {
      result = subtract(firstNumber, secondNumber);
    } else if (operator === 'multiply') {
      result = multiply(firstNumber, secondNumber);
    } else if (operator === 'divide') {
      result = divide(firstNumber, secondNumber);
    }
    
    return result.toFixed(2);
}

function sum(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}