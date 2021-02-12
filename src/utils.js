import { v4 as uuidv4 } from 'uuid';
import { cards } from './data/cards.json';

/**
 * Checks if given value is an integer or string representation of one
 *
 * @param {string|number} value Number or string
 * @returns {bool} Is value an Integer
 */
export const isNumeric = (value) => Number.isFinite(value) || (Number.isFinite(Number(value)) && typeof value === 'string');

/**
 * Returns the balance of brackets in string
 *
 * @param {Array} operationArray Operation array
 * @returns {int} Brackets balance
 */
const getParenthesisBalance = (operationArray) => {
  const parenthesis = operationArray.filter((el) => el === '(' || el === ')');

  const recursiveChecker = (parenthesisList, previousSymbol = null, currentValue = 0) => {
    if (!parenthesisList.length) {
      return currentValue;
    }

    if (currentValue === 0 && previousSymbol === ')') {
      return -1;
    }

    const [ firstSymbol ] = parenthesisList;
    const newValue = currentValue + Number(firstSymbol === '(') - Number(firstSymbol === ')');

    return recursiveChecker(parenthesisList.slice(1), firstSymbol, newValue);
  };

  return recursiveChecker(parenthesis);
};

/**
 * States if there's parenthesis left to close
 *
 * @param {*} operationArray Operation Array
 * @returns {bool} Exists parenthesis to close
 */
export const isParenthesisOpen = (operationArray) => getParenthesisBalance(operationArray) > 0;

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
    (
      lastSymbol === null || lastSymbol === '('
    ) && (
      isNumeric(symbol) || symbol === '('
    )
  ) {
    return true;
  }

  // if leading ) - allow only operators and ) if theres is ( to close
  if (
    lastSymbol === ')' && (
      (
        !isNumeric(symbol) && symbol !== '(' && symbol !== ')'
      ) || (
        symbol === ')' && isParenthesisOpen(operation)
      )
    )
  ) {
    return true;
  }

  // if leading number - allow operator, except (
  if (
    lastSymbol !== null &&
    isNumeric(lastSymbol) &&
    (
      (symbol === ')' && isParenthesisOpen(operation)) ||
      (!isNumeric(symbol) && symbol !== '(' && symbol !== ')')
    )
  ) {
    return true;
  }

  // if leading operator [+-*/] - allow only numbers and (
  if (!isNumeric(lastSymbol) && (isNumeric(symbol) || symbol === '(')) {
    return true;
  }

  return false;
};

export const transfromCard = (card) => {
  const numbers = card.numbers.map((el) => ({
    value: el,
    active: true,
    uuid: uuidv4(),
  }));

  return {
    numbers,
    grade: card.grade,
  };
};

export const getRandomCard = (difficulty) => {
  const filteredCards = difficulty > 0
    ? cards.filter((card) => card.grade === difficulty)
    : cards;

  const randomIndex = Math.floor(Math.random() * filteredCards.length);
  const card = { ...filteredCards[randomIndex] };

  return transfromCard(card);
};
