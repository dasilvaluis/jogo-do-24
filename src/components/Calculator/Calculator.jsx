import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isSymbolPossible, getCalculationResult, isParenthesisOpen } from '../../Helpers';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.MAXIMUM_NUMBERS = 4;
    this.MAXIMUM_OPERATORS = 3;

    this.AVAILABLE_OPERATORS = [
      {
        sign: '+',
        name: 'add',
      },
      {
        sign: '-',
        name: 'subtract',
      },
      {
        sign: '/',
        name: 'divide',
      },
      {
        sign: '*',
        name: 'multiply',
      },
      {
        sign: '(',
        name: 'open parenthesis',
      },
      {
        sign: ')',
        name: 'close parenthesis',
      },
    ];

    this.state = {
      ready: false,
      numbers: [],
      operators: [],
      operation: [],
    };
  }

  /**
   * Reset Calculator
   *
   * @returns {void}
   */
  reset() {
    this.setState({
      ready: false,
      numbers: [],
      operators: [],
      operation: [],
    });
  }

  /**
   * Handle Operator button click
   *
   * @param {event} e DOM Event
   * @returns {void}
   */
  handleOperatorClick(e) {
    const operatorValue = e.target.getAttribute('data-operator');
    this.registerOperator(operatorValue);
  }

  /**
   * Handle click o Clear button
   *
   * @returns {void}
   */
  handleClear() {
    this.reset();
    this.props.onReset();
  }

  /**
   * Handle click on Submit button
   *
   * @returns {void}
   */
  handleSubmit() {
    const { operation } = this.state;
    if (!operation.length || isParenthesisOpen(operation)) { return; }

    let calc = '';
    for (let i = 0; i < operation.length; i++) {
      calc = `${calc}${operation[i]}`;
    }

    // Return result to Board
    this.props.onFinish({
      solution: calc,
      value: getCalculationResult(calc),
    });
  }

  /**
   * Registers number in the current operation
   *
   * @param {number} number Number to register
   * @returns {bool} Successful
   */
  registerNumber(number) {
    const { numbers, operators, operation } = this.state;

    // Return if to many numbers
    if (this.MAXIMUM_NUMBERS <= numbers.length) { return false; }

    // Push number
    if (!isSymbolPossible(number, operation)) {
      // error
      return false;
    }

    operation.push(number);
    numbers.push(number);
    this.setState({
      ready: this.MAXIMUM_OPERATORS === operators.length
        && this.MAXIMUM_NUMBERS === numbers.length
        && !isParenthesisOpen(operation),
      numbers,
      operation,
    });

    return true;
  }

  /**
   * Registers operator in the current operation
   *
   * @param {string} operator Operator string [+-/*()]
   * @returns {bool} Successful
   */
  registerOperator(operator) {
    const { numbers, operators, operation } = this.state;

    // Return if to many operators
    if (this.MAXIMUM_OPERATORS <= operators.length && '(' !== operator && ')' !== operator) { return false; }

    // Push operator
    if (!isSymbolPossible(operator, operation)) {
      // error
      return false;
    }

    operation.push(operator);
    if ('(' !== operator && ')' !== operator) {
      operators.push(operator);
    }
    this.setState({
      ready: this.MAXIMUM_OPERATORS === operators.length
        && this.MAXIMUM_NUMBERS === numbers.length
        && !isParenthesisOpen(operation),
      operators,
      operation,
    });

    return true;
  }

  render() {
    const { ready, operation } = this.state;

    return (
      <div className="calculator">
        <div className="calculator__input-container">
          <input className="calculator__input" type="text" value={operation.join(' ')} disabled />
        </div>
        <div className="calculator__controls">
          {
            this.AVAILABLE_OPERATORS.map(
              el => (
                <button
                  type="button"
                  className="calculator__button calculator__operator"
                  key={el.sign}
                  onClick={e => this.handleOperatorClick(e)}
                  data-operator={el.sign}
                  title={el.name}
                >
                  {el.sign}
                </button>
              ),
            )
          }
          <button type="button" className="calculator__submit" onClick={() => this.handleClear()}>C</button>
          <button type="button" className="calculator__submit" disabled={!ready} onClick={() => this.handleSubmit()}>=</button>
        </div>
      </div>
    );
  }
}

Calculator.defaultProps = {
  onReset: () => {},
  onFinish: () => {},
};

Calculator.propTypes = {
  onReset: PropTypes.func,
  onFinish: PropTypes.func,
};

export default Calculator;
