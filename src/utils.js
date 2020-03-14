import { cards } from './data/cards.json';

/**
 * Checks if given value is an integer or string representation of one
 *
 * @param {string|number} value Number or string
 * @returns {bool} Is value an Integer
 */
export const isNumeric = value => Number.isFinite(value) || (Number.isFinite(Number(value)) && typeof value === 'string');

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


/**
 * Test if is possible to append given symbol to operation array
 *
 * @param {string} symbol Symbol to test
 * @param {Array} operation Operation to test the symbol agaisnt
 * @returns {bool} Symbol is possble
 */
export const isSymbolPossible = (symbol, operation) => {
  const lastSymbol = operation.length ? operation[operation.length - 1] : null;

  // if empty operation or leading (
  if (
    (null === lastSymbol || '(' === lastSymbol)
    && (isNumeric(symbol) || '(' === symbol)
  ) {
    return true;
  }

  // if leading ) - allow only operators and ) if theres is ( to close
  if (
    ')' === lastSymbol
    && (
      (!isNumeric(symbol) && '(' !== symbol && ')' !== symbol)
      || (')' === symbol && isParenthesisOpen(operation))
    )
  ) {
    return true;
  }

  // if leading number - allow operator, except (
  if (
    null !== lastSymbol
    && isNumeric(lastSymbol)
    && (
      (')' === symbol && isParenthesisOpen(operation))
      || (!isNumeric(symbol) && '(' !== symbol && ')' !== symbol)
    )
  ) {
    return true;
  }

  // if leading operator [+-*/] - allow only numbers and (
  if (!isNumeric(lastSymbol) && (isNumeric(symbol) || '(' === symbol)) {
    return true;
  }

  return false;
};

export const transfromCard = (card) => {
  const numbers = card.numbers.map((el) => ({
    value: el,
    active: true,
  }));

  return {
    numbers,
    grade: card.grade,
  };
};

export const getRandomCard = (difficulty) => {
  const filteredCards = difficulty > 0
    ? cards.filter(card => card.grade === difficulty)
    : cards;

  const randomIndex = Math.floor(Math.random() * filteredCards.length);
  const card = { ...filteredCards[randomIndex] };

  return transfromCard(card);
};
