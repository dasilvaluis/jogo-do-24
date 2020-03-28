import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CalculationActions } from '../../actions';
import { isNumeric, isParenthesisOpen } from '../../utils';
import './Calculator.scss';

const Calculator = (props) => {
  const { isReady, operation } = props;

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

  /**
   * Handle Operator button click
   *
   * @param {event} e DOM Event
   * @returns {void}
   */
  const handleOperatorClick = (operator) => {
    props.onOperatorClick(operator);
  }

  const handleNumberClick = (value, index) => {
    props.onNumberClick(value, index);
  }

  /**
   * Handle click o Clear button
   *
   * @returns {void}
   */
  const handleClear = () => {
    props.resetOperation();
    props.onReset();
  }

  /**
   * Handle click on Submit button
   *
   * @returns {void}
   */
  const handleSubmit = () => {
    if (!operation.length || isParenthesisOpen(operation)) { return; }

    const calc = operation.join('');

    // Return result to Board
    props.onFinish({
      solution: calc,
      value: getCalculationResult(calc),
    });
  };

  return (
    <div className="calculator">
      <div className="calculator__input-container">
        <input className="calculator__input" type="text" value={operation.join(' ')} disabled />
      </div>
      <div className="calculator__controls">
        {props.card.numbers.map((el, index) => (
          <button
            type="button"
            className="calculator__button"
            key={`calculator--${el.value}--${index}`}
            onClick={() => handleNumberClick(el.value, index)}
            disabled={!el.active}
          >
            {el.value}
          </button>
        ))}
        {[ '+', '-', '/', '*', '(', ')' ].map((el) => (
          <button
            type="button"
            className="calculator__button"
            key={el}
            onClick={() => handleOperatorClick(el)}
          >
            {el}
          </button>
        ))}
        <button type="button" className="calculator__submit" onClick={handleClear}>C</button>
        <button type="button" className="calculator__submit" disabled={!isReady} onClick={handleSubmit}>=</button>
      </div>
    </div>
  );
}

Calculator.defaultProps = {
  onReset: () => {},
  onFinish: () => {},
  onOperatorClick: () => {},
  onNumberClick: () => {},
};

Calculator.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  onReset: PropTypes.func,
  onFinish: PropTypes.func,
  onOperatorClick: PropTypes.func,
  onNumberClick: PropTypes.func,
  resetOperation: PropTypes.func.isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  isReady: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  operation: state.operation,
  isReady: state.isReady,
});

const mapDispatchToProps = {
  addSymbol: CalculationActions.addSymbol,
  resetOperation: CalculationActions.resetOperation,
  setReady: CalculationActions.setReady,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
