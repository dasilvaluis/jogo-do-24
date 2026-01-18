import { isOpenParenthesis, isCloseParenthesis, isOperator, isParenthesisOpen, isNumeric } from '../../utils';

export function useButtonsDisabled(operation) {
  const [lastSymbol] = operation.slice(-1);

  const operatorsDisabled = typeof lastSymbol === 'undefined' ||
    isOperator(lastSymbol) ||
    isOpenParenthesis(lastSymbol);

  // ( allowed after: nothing, operator, or (
  const openParenDisabled = !(
    typeof lastSymbol === 'undefined' ||
    isOperator(lastSymbol) ||
    isOpenParenthesis(lastSymbol)
  );

  // ) allowed when: there's an open paren AND last is number or )
  const closeParenDisabled = !isParenthesisOpen(operation) ||
    !(isNumeric(lastSymbol) || isCloseParenthesis(lastSymbol));

  return {
    operatorsDisabled,
    openParenDisabled,
    closeParenDisabled,
  };
}
