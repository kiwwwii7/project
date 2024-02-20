document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    let currentInput = '';
    let shouldResetDisplay = false;

    // Function to update the display
    function updateDisplay() {
        display.value = currentInput;
    }

    // Function to handle button clicks
    function handleButtonClick(event) {
        const clickedButton = event.target;
        const buttonValue = clickedButton.textContent;

        if (!isNaN(buttonValue) || buttonValue === '.') {
            // If the button clicked is a number or decimal point
            currentInput += buttonValue;
            updateDisplay();
        } else if (buttonValue === 'AC') {
            // Clear button
            currentInput = '';
            updateDisplay();
        } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '×' || buttonValue === '÷') {
            // Operator buttons
            if (currentInput !== '') {
                currentInput += ' ' + buttonValue + ' ';
                updateDisplay();
            }
        } else if (buttonValue === '=') {
            // Equal button
            if (currentInput !== '') {
                currentInput = evaluateExpression(currentInput);
                updateDisplay();
            }
        }
    }

    // Function to evaluate expression
    function evaluateExpression(expression) {
        const tokens = expression.split(' ');
        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const operand = parseFloat(tokens[i + 1]);
            if (isNaN(operand)) {
                return 'Error';
            }
            if (operator === '+') {
                result += operand;
            } else if (operator === '-') {
                result -= operand;
            } else if (operator === '×') {
                result *= operand;
            } else if (operator === '÷') {
                if (operand === 0) {
                    return 'Error';
                }
                result /= operand;
            }
        }
        return result;
    }

    // Add event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});
