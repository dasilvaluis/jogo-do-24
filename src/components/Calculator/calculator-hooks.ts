import {
  isOpenParenthesis,
  isCloseParenthesis,
  isOperator,
  isParenthesisOpen,
  isNumeric,
} from "../../utils";
import type { OperationSymbol } from "../../types";

export function useButtonsDisabled(operation: OperationSymbol[]) {
  const [lastSymbol] = operation.slice(-1);

  const operatorsDisabled =
    typeof lastSymbol === "undefined" ||
    isOperator(lastSymbol) ||
    isOpenParenthesis(lastSymbol);

  const openParenDisabled = !(
    typeof lastSymbol === "undefined" ||
    isOperator(lastSymbol) ||
    isOpenParenthesis(lastSymbol)
  );

  const closeParenDisabled =
    !isParenthesisOpen(operation) ||
    !(isNumeric(lastSymbol) || isCloseParenthesis(lastSymbol));

  return {
    operatorsDisabled,
    openParenDisabled,
    closeParenDisabled,
  };
}
