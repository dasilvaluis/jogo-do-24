import { MAXIMUM_NUMBERS } from '../../constants';
import { isNumeric, isParenthesisOpen } from '../../utils';

export const getOperation = (state) => state.operation;

export const getUsedNumbers = (state) => getOperation(state).filter(isNumeric);

export const isOperationReady = (state) => MAXIMUM_NUMBERS <= getUsedNumbers(state).length &&
  !isParenthesisOpen(state.operation);
