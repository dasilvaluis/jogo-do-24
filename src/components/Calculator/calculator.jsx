import React from 'react';
import PropTypes from 'prop-types';
import { OPERATORS, SYMBOLS } from '../../constants';
import { isNumeric, isOpenParenthesis, isOperator, isParenthesis, isParenthesisOpen } from '../../utils';
import { doCalculation } from './calculator-utils';
import './calculator.scss';

export const Calculator = ({
  card,
  isReady,
  operation,
  onNumberClick,
  onOperatorClick,
  onParenthesisClick,
  onClear,
  onSubmit,
}) => {
  const [ lastSymbol ] = operation.slice(-1);

  const operatorsDisabled = typeof lastSymbol === 'undefined' ||
    isOperator(lastSymbol) ||
    isOpenParenthesis(lastSymbol) ||
    isReady;
  const parenthesisDisabled = isReady || (
    isParenthesis(lastSymbol) &&
    !isParenthesisOpen(operation)
  );

  const handleSubmit = () => {
    if (!operation.length || isParenthesisOpen(operation)) { return; }

    onSubmit({
      solution: operation.join(''),
      value: doCalculation(operation),
    });
  };

  return (
    <div className="calculator">
      <div className="calculator__input-container">
        <input className="calculator__input" type="text" value={ operation.join(' ') } disabled />
      </div>
      <div className="calculator__controls">
        <div className="calculator__column">
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
        </div>
        <div className="calculator__column">
          { Object.values(OPERATORS).map((el) => (
            <button
              type="button"
              className="calculator__button"
              key={ el }
              disabled={ operatorsDisabled }
              onClick={ () => onOperatorClick(el) }
            >
              { el }
            </button>
          )) }
        </div>
        <div className="calculator__column -sm">
          <button
            type="button"
            className="calculator__button"
            disabled={ parenthesisDisabled }
            onClick={ onParenthesisClick }
          >
            { SYMBOLS.PARENTHESIS }
          </button>
          <button
            type="button"
            className="calculator__button"
            disabled={ !operation.length }
            onClick={ onClear }
          >
            C
          </button>
        </div>
        <button
          type="button"
          className="calculator__button -tall"
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
  onSubmit: () => {},
  onNumberClick: () => {},
  onOperatorClick: () => {},
  onParenthesisClick: () => {},
};

Calculator.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  isReady: PropTypes.bool.isRequired,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  onNumberClick: PropTypes.func,
  onOperatorClick: PropTypes.func,
  onParenthesisClick: PropTypes.func,
};
