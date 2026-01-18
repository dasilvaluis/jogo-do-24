import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { OPERATORS, PARENTHESIS } from '../../constants';
import { isNumeric, getParenthesisBalance, isOperator } from '../../utils';
import { doCalculation } from './calculator-utils';
import { CalculatorButton } from './calculator-button';
import { useButtonsDisabled } from './calculator-hooks';
import './calculator.scss';

export function Calculator({
  card,
  isReady,
  operation,
  message,
  onNumberClick,
  onOperatorClick,
  onParenthesisClick,
  onClear,
  onBackspace,
  onSubmit,
}) {
  const { operatorsDisabled, openParenDisabled, closeParenDisabled } = useButtonsDisabled(operation);
  const [lastSymbol] = operation.slice(-1);

  const submitSolution = useCallback(() => {
    if (!operation.length) return;

    const balance = getParenthesisBalance(operation);
    const finalOperation = [...operation];
    for (let i = 0; i < balance; i++) {
      finalOperation.push(PARENTHESIS.CLOSE);
    }

    onSubmit({
      solution: finalOperation.join(''),
      value: doCalculation(finalOperation),
    });
  }, [operation, onSubmit]);

  const handleKeyDown = useCallback((e) => {
    const key = e.key;

    // Numbers - find matching active card number
    if (/^[0-9]$/.test(key)) {
      const num = parseInt(key, 10);
      const index = card.numbers.findIndex((n) => n.active && n.value === num);
      if (index !== -1) {
        onNumberClick(num, index);
      }
      return;
    }

    // Operators
    if (isOperator(key)) {
      onOperatorClick(key);
      return;
    }

    // Parentheses
    if (key === '(' && !openParenDisabled && !isReady) {
      onParenthesisClick(PARENTHESIS.OPEN);
      return;
    }
    if (key === ')' && !closeParenDisabled && !isReady) {
      onParenthesisClick(PARENTHESIS.CLOSE);
      return;
    }

    // Enter or = to submit
    if ((key === 'Enter' || key === '=') && isReady) {
      submitSolution();
      return;
    }

    // Escape or c/C to clear
    if ((key === 'Escape' || key === 'c' || key === 'C') && operation.length) {
      onClear();
    }

    // Backspace to delete last symbol
    if (key === 'Backspace' && operation.length) {
      onBackspace();
    }
  }, [card.numbers, isReady, openParenDisabled, closeParenDisabled, operation.length, onNumberClick, onOperatorClick, onParenthesisClick, onClear, onBackspace, submitSolution]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="calculator">
      <input
        className="calculator__input"
        type="text"
        value={operation.join(' ')}
        disabled
      />
      <div className="calculator__controls">
        <div className="calculator__column">
          {card.numbers.map((el, index) => (
            <CalculatorButton
              key={`calculator-number--${el.uuid}`}
              disabled={!el.active || (isNumeric(lastSymbol) || lastSymbol === PARENTHESIS.CLOSE)}
              onClick={() => onNumberClick(el.value, index)}
            >
              {el.value}
            </CalculatorButton>
          ))}
        </div>
        <div className="calculator__column">
          {Object.values(OPERATORS).map((el) => (
            <CalculatorButton
              key={el}
              disabled={isReady || operatorsDisabled}
              onClick={() => onOperatorClick(el)}
            >
              {el}
            </CalculatorButton>
          ))}
        </div>
        <div className="calculator__column -sm">
          <CalculatorButton
            disabled={isReady || openParenDisabled}
            onClick={() => onParenthesisClick(PARENTHESIS.OPEN)}
          >
            (
          </CalculatorButton>
          <CalculatorButton
            disabled={isReady || closeParenDisabled}
            onClick={() => onParenthesisClick(PARENTHESIS.CLOSE)}
          >
            )
          </CalculatorButton>
        </div>
        <div className="calculator__column -sm">
          <CalculatorButton disabled={!operation.length} onClick={onClear}>
            C
          </CalculatorButton>
          <CalculatorButton disabled={!isReady} onClick={submitSolution}>
            =
          </CalculatorButton>
        </div>
      </div>
      {message && (
        <div className={`calculator__message calculator__message--${message.type}`}>
          {message.message}
        </div>
      )}
    </div>
  );
}

Calculator.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  isReady: PropTypes.bool.isRequired,
  message: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  onClear: PropTypes.func.isRequired,
  onBackspace: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNumberClick: PropTypes.func.isRequired,
  onOperatorClick: PropTypes.func.isRequired,
  onParenthesisClick: PropTypes.func.isRequired,
};

Calculator.defaultProps = {
  message: null,
};
