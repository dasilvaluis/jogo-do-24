import React from 'react';
import PropTypes from 'prop-types';
import { OPERATORS, SYMBOLS } from '../../constants';
import { isNumeric, isParenthesisOpen } from '../../utils';
import { doCalculation } from './calculator-utils';
import { CalculatorButton } from './calculator-button';
import { useButtonsDisabled } from './calculator-hooks';
import './calculator.scss';

export function Calculator({
  card,
  isReady,
  operation,
  onNumberClick,
  onOperatorClick,
  onParenthesisClick,
  onClear,
  onSubmit,
}) {
  const { operatorsDisabled, parenthesisDisabled } = useButtonsDisabled(operation);
  const [ lastSymbol ] = operation.slice(-1);

  function submitSolution() {
    if (operation.length && !isParenthesisOpen(operation)) {
      onSubmit({
        solution: operation.join(''),
        value: doCalculation(operation),
      });
    }
  }

  return (
    <div className="calculator">
      <input className="calculator__input" type="text" value={ operation.join(' ') } disabled />
      <div className="calculator__controls">
        <div className="calculator__column">
          { card.numbers.map((el, index) => (
            <CalculatorButton
              key={ `calculator-number--${ el.uuid }` }
              disabled={ !el.active || isNumeric(lastSymbol) }
              onClick={ () => onNumberClick(el.value, index) }
            >
              { el.value }
            </CalculatorButton>
          )) }
        </div>
        <div className="calculator__column">
          { Object.values(OPERATORS).map((el) => (
            <CalculatorButton
              key={ el }
              disabled={ isReady || operatorsDisabled }
              onClick={ () => onOperatorClick(el) }
            >
              { el }
            </CalculatorButton>
          )) }
        </div>
        <div className="calculator__column -sm">
          <CalculatorButton
            disabled={ isReady || parenthesisDisabled }
            onClick={ onParenthesisClick }
          >
            { SYMBOLS.PARENTHESIS }
          </CalculatorButton>
          <CalculatorButton disabled={ !operation.length } onClick={ onClear }>
            C
          </CalculatorButton>
        </div>
        <CalculatorButton type="vertical-rect" disabled={ !isReady } onClick={ submitSolution }>
          =
        </CalculatorButton>
      </div>
    </div>
  );
}

Calculator.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  isReady: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNumberClick: PropTypes.func.isRequired,
  onOperatorClick: PropTypes.func.isRequired,
  onParenthesisClick: PropTypes.func.isRequired,
};
