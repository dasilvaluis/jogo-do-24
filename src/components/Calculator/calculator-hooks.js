import { isOpenParenthesis, isOperator, isParenthesis, isParenthesisOpen } from '../../utils';

export function useButtonsDisabled(operation) {
  const [ lastSymbol ] = operation.slice(-1);

  const operatorsDisabled = typeof lastSymbol === 'undefined' ||
    isOperator(lastSymbol) ||
    isOpenParenthesis(lastSymbol);

  const parenthesisDisabled = isParenthesis(lastSymbol) && !isParenthesisOpen(operation);

  return {
    operatorsDisabled,
    parenthesisDisabled,
  };
}
