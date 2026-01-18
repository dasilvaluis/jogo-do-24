import { OPERATORS } from "../../constants";
import {
  isOpenParenthesis,
  isCloseParenthesis,
  isNumeric,
  isParenthesis,
  isOperator,
  getParenthesisBalance,
} from "../../utils";
import type { OperationSymbol, Operator } from "../../types";

function isAddition(char: OperationSymbol): boolean {
  return char === OPERATORS.PLUS;
}

function isSubtraction(char: OperationSymbol): boolean {
  return char === OPERATORS.MINUS;
}

function isMultiplication(char: OperationSymbol): boolean {
  return char === OPERATORS.MULTIPLY;
}

function isDivision(char: OperationSymbol): boolean {
  return char === OPERATORS.DIVIDE;
}

function getPreviousValue(
  array: OperationSymbol[],
  currIndex: number,
): OperationSymbol | undefined {
  return array[currIndex - 1];
}

function doOperation(
  operator: Operator,
  firstValue: number,
  secondValue: number,
): number {
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

function calculatePrecendentChuncks(
  operation: OperationSymbol[],
): OperationSymbol[] {
  return operation.reduce<OperationSymbol[]>((acc, curr, index, array) => {
    const previousValue = getPreviousValue(array, index);

    if (isMultiplication(curr) || isDivision(curr)) {
      return acc;
    }

    if (
      isNumeric(curr) &&
      previousValue !== undefined &&
      (isMultiplication(previousValue) || isDivision(previousValue))
    ) {
      const parsedNumber = typeof curr === "number" ? curr : parseFloat(curr);
      const lastAccIndex = acc.length - 1;
      const lastNumber = acc[lastAccIndex] as number;
      const withoutLastNumber = acc.slice(0, lastAccIndex);
      const calc = doOperation(
        previousValue as Operator,
        lastNumber,
        parsedNumber,
      );

      return [...withoutLastNumber, calc];
    }

    return [...acc, curr];
  }, []);
}

function calculateAdditions(operation: OperationSymbol[]): number {
  return operation.reduce<number>((acc, curr, index, array) => {
    const parsedNumber =
      typeof curr === "number" ? curr : parseFloat(String(curr));
    const previousValue = getPreviousValue(array, index);

    if (index === 0) {
      return parsedNumber;
    }

    if (
      isNumeric(curr) &&
      previousValue !== undefined &&
      (isAddition(previousValue) || isSubtraction(previousValue))
    ) {
      return doOperation(previousValue as Operator, acc, parsedNumber);
    }

    return acc;
  }, 0);
}

export function doSimpleCalculation(operation: OperationSymbol[]): number {
  return calculateAdditions(calculatePrecendentChuncks(operation));
}

function getLastOpenParenIndex(operation: OperationSymbol[]): number {
  const reverseLastOpenParenIndex = [...operation]
    .reverse()
    .findIndex(isOpenParenthesis);

  return reverseLastOpenParenIndex > -1
    ? operation.length - 1 - reverseLastOpenParenIndex
    : -1;
}

function getFirstCloseParenIndex(
  operation: OperationSymbol[],
  openParenIndex: number,
): number {
  const nextclosingParenIndex = operation
    .slice(openParenIndex)
    .findIndex(isCloseParenthesis);

  return nextclosingParenIndex > -1
    ? operation.slice(0, openParenIndex).length + nextclosingParenIndex
    : -1;
}

function resolveOperationChunck(
  operation: OperationSymbol[],
  openParenIndex: number,
  closeParenIndex: number,
): number {
  const innerOperation = operation.slice(openParenIndex + 1, closeParenIndex);

  return doSimpleCalculation(innerOperation);
}

function resolveParenthesis(operation: OperationSymbol[]): OperationSymbol[] {
  if (!operation.some(isParenthesis)) {
    return operation;
  }

  const openParenIndex = getLastOpenParenIndex(operation);
  const closeParenIndex = getFirstCloseParenIndex(operation, openParenIndex);
  const innerOperationResult = resolveOperationChunck(
    operation,
    openParenIndex,
    closeParenIndex,
  );

  const resultingOperation: OperationSymbol[] = [
    ...operation.slice(0, openParenIndex),
    innerOperationResult,
    ...operation.slice(closeParenIndex + 1),
  ];

  return resolveParenthesis(resultingOperation);
}

export function doCalculation(operation: OperationSymbol[]): number {
  if (!Array.isArray(operation)) {
    throw Error("Operation is not an array!");
  }

  if (
    operation.some(
      (el) => !isOperator(el) && !isNumeric(el) && !isParenthesis(el),
    )
  ) {
    throw Error(
      "Operation has elements that are not operators/numbers/parenthesis!",
    );
  }

  if (getParenthesisBalance(operation) !== 0) {
    throw Error("Parenthesis are not in balance!");
  }

  return doSimpleCalculation(resolveParenthesis(operation));
}
