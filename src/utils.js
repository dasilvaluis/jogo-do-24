import { v4 as uuidv4 } from 'uuid';
import { PARENTHESIS, SYMBOLS } from './constants';
import { cards } from './data/cards.json';

/**
 * Checks if given value is an integer or string representation of one
 *
 * @param {string|number} value Number or string
 * @returns {Boolean} Value is an Integer
 */
export const isNumeric = (value) => Number.isFinite(value) || (Number.isFinite(Number(value)) && typeof value === 'string');

/**
 * Checks if given string is a open parenthesis
 *
 * @param {String} character
 */
export const isOpenParenthesis = (character) => character === PARENTHESIS.OPEN;

/**
 * Checks if given string is a closing parenthesis
 *
 * @param {String} character
 */
export const isCloseParenthesis = (character) => character === PARENTHESIS.CLOSE;

/**
 * Checks if given string is a open parenthesis
 *
 * @param {String} character
 */
export const isParenthesis = (character) => isOpenParenthesis(character) ||
  isCloseParenthesis(character);

/**
 * Checks if a given value is a operator (+, -, /, *)
 *
 * @param {String} value to test
 * @returns {Boolean} Value is an operator
 */
export const isOperator = (value) => [
  SYMBOLS.PLUS,
  SYMBOLS.MINUS,
  SYMBOLS.DIVIDE,
  SYMBOLS.MULTIPLY,
].includes(value);

export function getParenthesisBalance(operationArray) {
  const parenthesis = operationArray.filter(isParenthesis);

  const recursiveChecker = (parenthesisList, currentValue = 0) => {
    if (!parenthesisList.length) {
      return currentValue;
    }

    const [ firstSymbol ] = parenthesisList;

    if (currentValue === 0 && isCloseParenthesis(firstSymbol)) {
      return -1;
    }

    const newValue = currentValue +
      Number(isOpenParenthesis(firstSymbol)) -
      Number(isCloseParenthesis(firstSymbol));

    return recursiveChecker(parenthesisList.slice(1), newValue);
  };

  return recursiveChecker(parenthesis);
}

/**
 * States if there's parenthesis left to close
 *
 * @param {Array.<string>} operationArray Operation Array
 * @returns {Boolean} Exists parenthesis to close
 */
export function isParenthesisOpen(operationArray) {
  return getParenthesisBalance(operationArray) > 0;
}

/**
 * @typedef CardNumber
 * @type {object}
 * @property {Number} value - Number value
 * @property {Boolean} active - Number is active
 * @property {String} uuid - Number Id
 */

/**
 * @typedef DBCard
 * @type {object}
 * @property {Array.<Number>} numbers -  Card Numbers
 * @property {Number} grade - Card Grade
 */

/**
 * @typedef GameCard
 * @type {object}
 * @property {Array.<CardNumber>} numbers -  Card Numbers
 * @property {Number} grade - Card Grade
 */

/**
  * Takes a card from the DB and gives the numbers extra properties
  * @param {DBCard} card
  * @returns {Card} New Card
  */
export function transfromCard(card) {
  const numbers = card.numbers.map((el) => ({
    value: el,
    active: true,
    uuid: uuidv4(),
  }));

  return {
    numbers,
    grade: card.grade,
  };
}

/**
 * Gets a random card.
 *
 * @param {Number} difficulty
 * @returns {Card} New Card
 */
export function getRandomCard(difficulty) {
  const filteredCards = difficulty > 0
    ? cards.filter((card) => card.grade === difficulty)
    : cards;

  const randomIndex = Math.floor(Math.random() * filteredCards.length);
  const card = { ...filteredCards[randomIndex] };

  return transfromCard(card);
}
