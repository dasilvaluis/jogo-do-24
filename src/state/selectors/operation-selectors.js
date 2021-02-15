import { isNumeric } from '../../utils';

export const getOperation = (state) => state.operation;

export const getUsedNumbers = (state) => getOperation(state).filter(isNumeric);
