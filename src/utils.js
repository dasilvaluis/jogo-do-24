import { v4 as uuidv4 } from 'uuid';
import { PARENTHESIS, SYMBOLS } from './constants';
import { cards } from './data/cards.json';

/**
 * Checks if given value is an integer or string representation of one
 *
 * @param {string|number} value Number or string
 * @returns {bool} Value is an Integer
 */
export const isNumeric = (value) => Number.isFinite(value) || (Number.isFinite(Number(value)) && typeof value === 'string');

export const isParenthesis = (el) => el === PARENTHESIS.OPEN || el === PARENTHESIS.CLOSE;

/**
 * Checks if a given value is a operator (+, -, /, *)
 *
 * @param {string} value to test
 * @returns {bool} Value is an operator
 */
export const isOperator = (value) => [
  SYMBOLS.PLUS,
  SYMBOLS.MINUS,
  SYMBOLS.DIVIDE,
  SYMBOLS.MULTIPLY,
].includes(value);

/**
 * States if there's parenthesis left to close
 *
 * @param {*} operationArray Operation Array
 * @returns {bool} Exists parenthesis to close
 */
export const isParenthesisOpen = (operationArray) => {
  const parenthesis = operationArray.filter(isParenthesis);

  const recursiveChecker = (parenthesisList, currentValue = 0) => {
    if (!parenthesisList.length) {
      return currentValue;
    }

    const [ firstSymbol ] = parenthesisList;

    if (currentValue === 0 && firstSymbol === PARENTHESIS.CLOSE) {
      return -1;
    }

    const newValue = currentValue +
      Number(firstSymbol === PARENTHESIS.OPEN) -
      Number(firstSymbol === PARENTHESIS.CLOSE);

    return recursiveChecker(parenthesisList.slice(1), newValue);
  };

  return recursiveChecker(parenthesis) > 0;
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
