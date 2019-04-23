/**
 * Checks if given value is an integer or string representation of one
 *
 * @param {string|number} value Number or string
 * @returns {bool} Is value an Integer
 */
export const isNumeric = value => Number.isFinite(value) || (Number.isFinite(Number(value)) && typeof value === 'string');

/**
 * Returns numeric result of string arithmetic calculation
 * Expected format: 4+2/6-1; 5-3*9/1; ...
 *
 * @param {string} calcString String representing the operation
 * @returns {number} Resulting integer, 0 on error
 */
export const getCalculationResult = (calcString) => {
  // eslint-disable-next-line no-eval
  const result = eval(calcString);
  return isNumeric(result) ? result : 0;
};

/**
 * Returns the balance of brackets in string
 *
 * @param {Array} operationArray Operation array
 * @returns {int} Brackets balance
 */
export const getBracketsBalance = (operationArray) => {
  const stack = [];

  const openBracketsMap = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  const closedBracketsMap = {
    ')': true,
    ']': true,
    '}': true,
  };

  let char;
  for (let i = 0; i < operationArray.length; i++) {
    char = operationArray[i];

    if (openBracketsMap[char]) {
      stack.push(char);
    } else if (closedBracketsMap[char] && openBracketsMap[stack.pop()] !== char) {
      return -1;
    }
  }

  return stack.length;
};

/**
 * States if there's parenthesis left to close
 *
 * @param {*} operationArray Operation Array
 * @returns {bool} Exists parenthesis to close
 */
export const isParenthesisOpen = operationArray => 0 < getBracketsBalance(operationArray);
