import { isOpenParenthesis, isCloseParenthesis, isNumeric, isParenthesis, isOperator, getParenthesisBalance } from '../../utils';

/**
 * Performs a basic two number calculation
 *
 * @param {String} operator
 * @param {Number} firstValue
 * @param {Number} secondValue
 * @returns {Number} Result
 */
function doOperation(operator, firstValue, secondValue) {
  switch (operator) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '/':
      return firstValue / secondValue;
    case '*':
      return firstValue * secondValue;
    default:
      return firstValue;
  }
}

/**
 * Calculate an expression without parenthesis
 *
 * @param {Array.<String>} operation.
 */
export const doSimpleCalculation = (operation) => operation
  .reduce((acc, curr, index, array) => {
    if (curr === '*' || curr === '/') {
      return acc;
    }

    if (isNumeric(curr) && (array[index - 1] === '*' || array[index - 1] === '/')) {
      const lastNumber = acc[acc.length - 1];
      const withoutLastNumber = acc.slice(0, acc.length - 1);
      const calc = doOperation(
        array[index - 1],
        lastNumber,
        parseFloat(curr, 10),
      );

      return [ ...withoutLastNumber, calc.toString() ];
    }

    return [ ...acc, curr ];
  }, [])
  .reduce((acc, curr, index, array) => {
    if (index === 0) {
      return parseFloat(curr, 10);
    }

    if (curr === '+' || curr === '-') {
      return acc;
    }

    if (isNumeric(curr) && (array[index - 1] === '+' || array[index - 1] === '-')) {
      return doOperation(array[index - 1], acc, parseFloat(curr, 10));
    }

    return acc;
  }, 0);

/**
 * Calculator
 *
 * @param {Array.<String>} operation Operation array
 * @returns {Array.<String>} An operation clean of parenthesis
 */
function resolveParenthesis(operation) {
  if (!operation.some(isParenthesis)) {
    return operation;
  }

  const reverseLastOpenParenIndex = [ ...operation ].reverse().findIndex(isOpenParenthesis);
  const openParenIndex = reverseLastOpenParenIndex > -1
    ? operation.length - 1 - reverseLastOpenParenIndex
    : -1;

  const nextclosingParenIndex = operation.slice(openParenIndex).findIndex(isCloseParenthesis);
  const closeParenIndex = nextclosingParenIndex > -1
    ? operation.slice(0, openParenIndex).length + nextclosingParenIndex
    : -1;

  const innerOperation = operation.slice(openParenIndex + 1, closeParenIndex);
  const innerOperationResult = doSimpleCalculation(innerOperation);

  const resultingOperation = [
    ...operation.slice(0, openParenIndex),
    innerOperationResult,
    ...operation.slice(closeParenIndex + 1),
  ];

  return resolveParenthesis(resultingOperation);
}

/**
 * Calculator
 *
 * @param {Array.<string>} operation Operation
 */
export function doCalculation(operation) {
  if (!Array.isArray(operation)) {
    throw Error('Operation is not an array!');
  }

  if (operation.some((el) => !isOperator(el) && !isNumeric(el) && !isParenthesis(el))) {
    throw Error('Operation has elements that are not operators/numbers/parenthesis!');
  }

  if (getParenthesisBalance(operation) !== 0) {
    throw Error('Parenthesis are not in balance!');
  }

  return doSimpleCalculation(resolveParenthesis(operation));
}
