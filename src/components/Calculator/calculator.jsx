import React from 'react';
import PropTypes from 'prop-types';
import { OPERATORS, SYMBOLS } from '../../constants';
import { isNumeric, isOperator, isParenthesis, isParenthesisOpen } from '../../utils';
import './calculator.scss';

export const Calculator = ({
  card,
  isReady,
  operation,
  onNumberClick,
  onOperatorClick,
  onParenthesisClick,
  onClear,
  onFinish,
}) => {
  /**
   * Returns numeric result of string arithmetic calculation
   * Expected format: 4+2/6-1; 5-3*9/1; ...
   *
   * @param {string} calcString String representing the operation
   * @returns {number} Resulting integer, 0 on error
   */
  const getCalculationResult = (calcString) => {
    // eslint-disable-next-line no-eval
    const result = eval(calcString);

    return isNumeric(result) ? result : 0;
  };

  const [ lastSymbol ] = operation.slice(-1);

  const handleSubmit = () => {
    if (!operation.length || isParenthesisOpen(operation)) { return; }

    const calc = operation.join('');

    // Return result to Board
    onFinish({
      solution: calc,
      value: getCalculationResult(calc),
    });
  };

  return (
    <div className="calculator">
      <div className="calculator__input-container">
        <input className="calculator__input" type="text" value={ operation.join(' ') } disabled />
      </div>
      <div className="calculator__controls">
        { card.numbers.map((el, index) => (
          <button
            type="button"
            className="calculator__button"
            key={ `calculator-number--${ el.uuid }` }
            onClick={ () => onNumberClick(el.value, index) }
            disabled={ !el.active || isNumeric(lastSymbol) }
          >
            { el.value }
          </button>
        )) }
        { Object.values(OPERATORS).map((el) => (
          <button
            type="button"
            className="calculator__button"
            key={ el }
            disabled={ typeof lastSymbol === 'undefined' || isOperator(lastSymbol) || isReady }
            onClick={ () => onOperatorClick(el) }
          >
            { el }
          </button>
        )) }
        <button
          type="button"
          className="calculator__submit"
          disabled={ isParenthesis(lastSymbol) && !isParenthesisOpen(operation) }
          onClick={ onParenthesisClick }
        >
          { SYMBOLS.PARENTHESIS }
        </button>
        <button
          type="button"
          className="calculator__submit"
          disabled={ !operation.length }
          onClick={ onClear }
        >
          C
        </button>
        <button
          type="button"
          className="calculator__submit"
          disabled={ !isReady }
          onClick={ handleSubmit }
        >
          =
        </button>
      </div>
    </div>
  );
};

Calculator.defaultProps = {
  onClear: () => {},
  onFinish: () => {},
  onNumberClick: () => {},
  onOperatorClick: () => {},
  onParenthesisClick: () => {},
};

Calculator.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  isReady: PropTypes.bool.isRequired,
  onClear: PropTypes.func,
  onFinish: PropTypes.func,
  onNumberClick: PropTypes.func,
  onOperatorClick: PropTypes.func,
  onParenthesisClick: PropTypes.func,
};
