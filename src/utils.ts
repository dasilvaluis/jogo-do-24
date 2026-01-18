import { v4 as uuidv4 } from "uuid";
import { LOCAL_STORAGE_DIFFICULTY, PARENTHESIS, SYMBOLS } from "./constants";
import { cards } from "./data/cards.json";
import type {
  DBCard,
  GameCard,
  OperationSymbol,
  Operator,
  Parenthesis as ParenthesisType,
} from "./types";

export function isNumeric(value: OperationSymbol): value is number {
  return (
    typeof value === "number" ||
    (typeof value === "string" && Number.isFinite(Number(value)))
  );
}

export function isOpenParenthesis(
  character: OperationSymbol,
): character is ParenthesisType {
  return character === PARENTHESIS.OPEN;
}

export function isCloseParenthesis(
  character: OperationSymbol,
): character is ParenthesisType {
  return character === PARENTHESIS.CLOSE;
}

export function isParenthesis(
  character: OperationSymbol,
): character is ParenthesisType {
  return isOpenParenthesis(character) || isCloseParenthesis(character);
}

export function isOperator(value: OperationSymbol | string): value is Operator {
  const operators = [
    SYMBOLS.PLUS,
    SYMBOLS.MINUS,
    SYMBOLS.DIVIDE,
    SYMBOLS.MULTIPLY,
  ];
  return operators.includes(value as Operator);
}

export function getParenthesisBalance(
  operationArray: OperationSymbol[],
): number {
  const parenthesis = operationArray.filter(isParenthesis);

  const recursiveChecker = (
    parenthesisList: ParenthesisType[],
    currentValue = 0,
  ): number => {
    if (!parenthesisList.length) {
      return currentValue;
    }

    const [firstSymbol] = parenthesisList;

    if (currentValue === 0 && isCloseParenthesis(firstSymbol)) {
      return -1;
    }

    const newValue =
      currentValue +
      Number(isOpenParenthesis(firstSymbol)) -
      Number(isCloseParenthesis(firstSymbol));

    return recursiveChecker(parenthesisList.slice(1), newValue);
  };

  return recursiveChecker(parenthesis);
}

export function isParenthesisOpen(operationArray: OperationSymbol[]): boolean {
  return getParenthesisBalance(operationArray) > 0;
}

export function transformCard(card: DBCard): GameCard {
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

export function getRandomCard(difficulty: number): GameCard {
  const filteredCards =
    difficulty > 0 ? cards.filter((card) => card.grade === difficulty) : cards;

  const randomIndex = Math.floor(Math.random() * filteredCards.length);
  const card = { ...filteredCards[randomIndex] };

  return transformCard(card);
}

export function getStoredDifficulty(): number {
  const storedDifficulty = localStorage.getItem(LOCAL_STORAGE_DIFFICULTY);
  return storedDifficulty ? parseInt(storedDifficulty, 10) : 0;
}

export function setStoredDifficulty(value: number): void {
  localStorage.setItem(LOCAL_STORAGE_DIFFICULTY, value.toString());
}
