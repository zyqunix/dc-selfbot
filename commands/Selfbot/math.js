module.exports = {
    name: 'math',
    description: 'Solves math problems',
    execute(message, args) {
        const mathExpression = args.join('');
        const regexArithmetic = /(-?\d+\.?\d*)([+\-*\/%x]?)(-?\d+\.?\d*)/; 
        const regexFactorial = /(-?\d+\.?\d*)!/; 

        const matchFactorial = mathExpression.match(regexFactorial);
        if (matchFactorial) {
            const num1 = parseFloat(matchFactorial[1]);
            if (num1 < 0) {
                message.edit('Factorial is not defined for negative numbers.');
                return;
            }
            const factorialResult = calculateFactorial(num1);

            const remainingExpression = mathExpression.slice(matchFactorial[0].length);
            const matchOptionalOperator = remainingExpression.match(/([+\-*\/%x])(-?\d+\.?\d*)/);
            if (matchOptionalOperator) {
                const operator = matchOptionalOperator[1];
                const num2 = parseFloat(matchOptionalOperator[2]);
                let result;

                switch (operator) {
                    case '+':
                        result = factorialResult + num2;
                        break;
                    case '-':
                        result = factorialResult - num2;
                        break;
                    case '*':
                    case 'x':
                        result = factorialResult * num2;
                        break;
                    case '/':
                        if (num2 === 0) {
                            message.edit('Cannot divide by zero!');
                            return;
                        }
                        result = factorialResult / num2;
                        result = Math.round(result * 1000) / 1000; // Round to the last three digits
                        break;
                    case '%':
                        result = factorialResult % num2;
                        break;
                    default:
                        message.edit('Invalid operator after factorial. Please use one of: +, -, *, /, %, x');
                        return;
                }

                message.edit(`Result: \`${result}\``);
            } else {
                message.edit(`Factorial of ${num1} is: \`${factorialResult}\``);
            }
        } else {
            const matchArithmetic = mathExpression.match(regexArithmetic);
            if (matchArithmetic) {
                const num1 = parseFloat(matchArithmetic[1]);
                const operator = matchArithmetic[2];
                const num2 = parseFloat(matchArithmetic[3]);
                let result;

                switch (operator) {
                    case '+':
                        result = num1 + num2;
                        break;
                    case '-':
                        result = num1 - num2;
                        break;
                    case '*':
                    case 'x':
                        result = num1 * num2;
                        break;
                    case '/':
                        if (num2 === 0) {
                            message.edit('Cannot divide by zero!');
                            return;
                        }
                        result = num1 / num2;
                        break;
                    case '%':
                        result = num1 % num2;
                        break;
                    default:
                        message.edit('Invalid operator. Please use one of: +, -, *, /, %, x');
                        return;
                }

                message.edit(`${num1} ${operator} ${num2} = \`${result}\``);
            } else {
                message.edit('Invalid math expression. Please check your input.');
            }
        }
    },
};

function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    let factorial = 1;
    for (let i = 2; i <= n; i++) {
        factorial *= i;
    }
    return factorial;
}
