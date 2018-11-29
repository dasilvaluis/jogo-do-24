import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Calculator extends Component {
  /**
   * Checks if given value is an integer or string representation of one
   *
   * @param {string|number} value Number or string
   * @returns {bool} Is value an Integer
   */
  static isNumeric(value) {
    return Number.isFinite(value) || (Number.isFinite(Number(value)) && typeof value === 'string')
  }

  /**
   * Returns numeric result of string arithmetic calculation
   * Expected format: 4+2/6-1; 5-3*9/1; ...
   *
   * @param {string} calcString String representing the operation
   * @returns {number} Resulting integer, 0 on error
   */
  static getResult(calcString) {
    // eslint-disable-next-line
    const result = eval(calcString);
    return Calculator.isNumeric(result) ? result : 0;
  }

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
        sign: '(',
        name: 'open parenthesis',
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
   * Get the last symbol of the current operation
   *
   * @returns {string} Symbol String
   */
  getLastSymbol() {
    const { operation } = this.state;
    if (!operation.length) {
      return null;
    }
    return operation[operation.length - 1];
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
    if (!operation.length || this.isParenthesisOpen()) { return; }

    let calc = '';
    for (let i = 0; i < operation.length; i++) {
      calc = `${calc}${operation[i]}`;
    }

    // Return result to Board
    this.props.onFinish({
      solution: calc,
      value: Calculator.getResult(calc),
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
    if (!this.isSymbolPossible(number)) {
      // error
      return false;
    }

    operation.push(number);
    numbers.push(number);
    this.setState({
      ready: this.MAXIMUM_OPERATORS === operators.length
        && this.MAXIMUM_NUMBERS === numbers.length
        && !this.isParenthesisOpen(),
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
    if (this.MAXIMUM_OPERATORS < operators.length) { return false; }

    // Push operator
    if (!this.isSymbolPossible(operator)) {
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
        && !this.isParenthesisOpen(),
      operators,
      operation,
    });

    return true;
  }

  /**
   * States if there's parenthesis left to close
   *
   * @returns {bool} Exists parenthesis to close
   */
  isParenthesisOpen() {
    const { operation } = this.state;
    let openParenthesisCount = 0;

    for (let i = 0; i < operation.length; i++) {
      if ('(' === operation[i]) {
        openParenthesisCount += 1;
      } else if (')' === operation[i]) {
        openParenthesisCount -= 1;
      }
    }

    return !!Math.abs(openParenthesisCount);
  }

  /**
   * Test if is possible to append given symbol to operation array
   *
   * @param {string} symbol Symbol to test
   * @returns {bool} Symbol is possble
   */
  isSymbolPossible(symbol) {
    const lastSymbol = this.getLastSymbol();

    // if empty operation or leading (
    if (null === lastSymbol || '(' === lastSymbol) {
      if (Calculator.isNumeric(symbol) || '(' === symbol) {
        return true;
      }
      // if leading ) - allow only operators and ) if theres is ( to close
    } else if (')' === lastSymbol) {
      if (!Calculator.isNumeric(symbol) && '(' !== symbol && ')' !== symbol) {
        return true;
      }

      if (')' === symbol && this.isParenthesisOpen()) {
        return true;
      }
      // if leading number - allow operator, except (
    } else if (null !== lastSymbol && Calculator.isNumeric(lastSymbol)) {
      if (')' === symbol && this.isParenthesisOpen()) {
        return true;
      }

      if (!Calculator.isNumeric(symbol) && '(' !== symbol && ')' !== symbol) {
        return true;
      }
      // if leading operator [+-*/] - allow only numbers and (
    } else if (!Calculator.isNumeric(lastSymbol)) {
      if (Calculator.isNumeric(symbol) || '(' === symbol) {
        return true;
      }
    }

    return false;
  }

  render() {
    const { ready, operation } = this.state;

    return (
      <div className="calculator">
        <div className="calculator__input-container">
          <input className="calculator__input" type="text" value={operation.join(' ')} disabled />
        </div>
        <div className="calculator__controls">
          <div className="calculator__operator-list">
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
          </div>
          <div className="calculator__submit-list">
            <button type="button" className="calculator__submit" onClick={() => this.handleClear()}>C</button>
            <button type="button" className="calculator__submit" disabled={!ready} onClick={() => this.handleSubmit()}>=</button>
          </div>
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
