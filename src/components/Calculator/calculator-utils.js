import { OPERATORS } from '../../constants';
import { isOpenParenthesis, isCloseParenthesis, isNumeric, isParenthesis, isOperator, getParenthesisBalance } from '../../utils';

/**
 * @param {String} char
 */
function isAddition(char) {
  return char === OPERATORS.PLUS;
}

/**
 * @param {String} char
 */
function isSubtraction(char) {
  return char === OPERATORS.MINUS;
}

/**
 * @param {String} char
 */
function isMultiplication(char) {
  return char === OPERATORS.MULTIPLY;
}

/**
 * @param {String} char
 */
function isDivision(char) {
  return char === OPERATORS.DIVIDE;
}

/**
 * Returns the previous value, just before the given index
 *
 * @param {Array.<any>} array
 * @param {Number} currIndex
 */
function getPreviousValue(array, currIndex) {
  return array[currIndex - 1];
}

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
    case OPERATORS.PLUS:
      return firstValue + secondValue;
    case OPERATORS.MINUS:
      return firstValue - secondValue;
    case OPERATORS.MULTIPLY:
      return firstValue * secondValue;
    case OPERATORS.DIVIDE:
      return firstValue / secondValue;
    default:
      return firstValue;
  }
}

/**
 * Resolves all precendences in an operation
 * i.e. 3 + 4 * 2 -> 3 + 8
 *
 * @param {Array.<String>} operation Operation expression to evaluate
 * @returns {Array.<String>} Operation cleaned of multiplications and division
 */
function calculatePrecendentChuncks(operation) {
  return operation.reduce((acc, curr, index, array) => {
    const previousValue = getPreviousValue(array, index);

    if (isMultiplication(curr) || isDivision(curr)) {
      return acc;
    }

    if (isNumeric(curr) && (isMultiplication(previousValue) || isDivision(previousValue))) {
      const parsedNumber = parseFloat(curr, 10);
      const lastAccIndex = acc.length - 1;
      const lastNumber = acc[lastAccIndex];
      const withoutLastNumber = acc.slice(0, lastAccIndex);
      const calc = doOperation(previousValue, lastNumber, parsedNumber);

      return [ ...withoutLastNumber, calc.toString() ];
    }

    return [ ...acc, curr ];
  }, []);
}

/**
 * Calculates an expression with only addition and subtraction
 * i.e. 10 + 3 - 5 -> 8
 *
 * @param {Array.<String>} operation Operation expression to evaluate
 * @returns {Number} Result of the operation expression
 */
function calculateAdditions(operation) {
  return operation.reduce((acc, curr, index, array) => {
    const parsedNumber = parseFloat(curr, 10);
    const previousValue = getPreviousValue(array, index);

    if (index === 0) {
      return parsedNumber;
    }

    if (isNumeric(curr) && (isAddition(previousValue) || isSubtraction(previousValue))) {
      return doOperation(previousValue, acc, parsedNumber);
    }

    return acc;
  }, 0);
}

/**
 * Calculate an expression without parenthesis
 *
 * @param {Array.<String>} operation Operation expression to evaluate
 * @returns {Number} Result of the operation expression
 */
export function doSimpleCalculation(operation) {
  return calculateAdditions(calculatePrecendentChuncks(operation));
}

/**
 * Returns the last open parenthesis index of an operation
 *
 * @param {Array.<String>} operation
 */
function getLastOpenParenIndex(operation) {
  const reverseLastOpenParenIndex = [ ...operation ].reverse().findIndex(isOpenParenthesis);

  return reverseLastOpenParenIndex > -1
    ? operation.length - 1 - reverseLastOpenParenIndex
    : -1;
}

/**
 * Returns the first closed parenthesis index of an operation after the given open parenthesis
 *
 * @param {Array.<String>} operation
 */
function getFirstCloseParenIndex(operation, openParenIndex) {
  const nextclosingParenIndex = operation.slice(openParenIndex).findIndex(isCloseParenthesis);

  return nextclosingParenIndex > -1
    ? operation.slice(0, openParenIndex).length + nextclosingParenIndex
    : -1;
}

/**
 * Resolves the result of an operation chuck delimeted by the given indexes
 *
 * @param {Array.<String>} operation
 * @param {Number} openParenIndex
 * @param {Number} closeParenIndex
 */
function resolveOperationChunck(operation, openParenIndex, closeParenIndex) {
  const innerOperation = operation.slice(openParenIndex + 1, closeParenIndex);

  return doSimpleCalculation(innerOperation);
}

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

  const openParenIndex = getLastOpenParenIndex(operation);
  const closeParenIndex = getFirstCloseParenIndex(operation, openParenIndex);
  const innerOperationResult = resolveOperationChunck(operation, openParenIndex, closeParenIndex);

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
