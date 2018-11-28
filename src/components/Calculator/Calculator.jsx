import React, { Component } from 'react';

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
      complete: false,
      numbers: [],
      operators: [],
      operation: [],
    };
  }

  render() {
    const { complete, operation } = this.state;
    return (
      <div className="calculator">
        <div className="calculator__input-container">
          <input className="calculator__input" type="text" value={operation.join(' ')} disabled/>
        </div>
        <div className="calculator__controls">
          <div className="calculator__operator-list">
            {
              this.AVAILABLE_OPERATORS.map((el, i) =>
                <button className="calculator__button calculator__operator" key={i} onClick={(e) => this.handleOperatorClick(e)} data-operator={el.sign} title={el.name}>{el.sign}</button>
              )
            }
          </div>
          <div className="calculator__submit-list">
            <button className="calculator__submit" onClick={() => this.handleClear()}>C</button>
            <button className="calculator__submit" disabled={!complete} onClick={() => this.handleSubmit()}>=</button>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Reset Calculator
   */
  reset() {
    this.setState({
      complete: false,
      numbers: [],
      operators: [],
      operation: [],
    });
  }

  registerNumber(number) {
    let _numbers = this.state.numbers;
    let _operators = this.state.operators;
    let _operation = this.state.operation;

    // Return if to many numbers
    if ( this.MAXIMUM_NUMBERS <= _numbers.length ) { return; }

    // Push number
    if ( !this.isSymbolPossible(number) ) {
      // error
      return false;
    }

    _operation.push(number);
    _numbers.push(number);
    this.setState({
      complete: this.MAXIMUM_OPERATORS === _operators.length && this.MAXIMUM_NUMBERS === _numbers.length && !this.existsParenthesisToClose(),
      numbers: _numbers,
      operation: _operation,
    });
  }

  registerOperator(operator) {
    let _operators = this.state.operators;
    let _numbers = this.state.numbers;
    let _operation = this.state.operation;

    // Return if to many operators
    if ( this.MAXIMUM_OPERATORS <= _operators.length ) { return; }

    // Push operator
    if ( !this.isSymbolPossible(operator) ) {
      // error
      return false;
    }
    _operation.push(operator);
    if ('(' !== operator && ')' !== operator) {
      _operators.push(operator);
    }
    this.setState({
      complete: this.MAXIMUM_OPERATORS === _operators.length && this.MAXIMUM_NUMBERS === _numbers.length && !this.existsParenthesisToClose(),
      operators: _operators,
      operation: _operation,
    });
  }

  /**
   * Handle Operator button click
   */
  handleOperatorClick(e) {
    const operatorValue = e.target.getAttribute('data-operator');
    this.registerOperator(operatorValue);
  }

  /**
   * Handle click o Clear button
   */
  handleClear() {
    this.reset();
    this.props.onReset();
  }

  /**
   * Handle click on Submit button
   */
  handleSubmit() {
    const operation = this.state.operation;
    if (!operation.length || this.existsParenthesisOpen()) { return; }

    let calc = '';
    for (let i = 0; i < operation.length; i++) {
      calc = `${calc}${operation[i]}`
    }

    // Return result to Board
    this.props.onFinish({
      'solution': calc,
      'value': this.getResult(calc),
    });
  }

  /**
   * Returns numeric result of string arithmetic calculation
   * Expected format: 4+2/6-1; 5-3*9/1; ...
   *
   * @param {string} calc_string
   * @returns {number} Resulting integer, 0 on error
   */
  getResult(calc_string) {
    // eslint-disable-next-line
    const result = eval(calc_string);
    return !isNaN(result) ? result : 0;
  }

  /**
   * Get the last symbol of the current operation
   *
   * @returns {string} Symbol String
   */
  getLastSymbol() {
    const operation = this.state.operation;
    if (!operation.length) {
      return null;
    }
    return operation[operation.length - 1];
  }

  /**
   * States if there's an open parenthesis in the calculation
   *
   * @returns {bool}
   */
  existsParenthesisOpen() {
    const operation = this.state.operation;
    let isOpen = false;
    for (let i = 0; i < operation.length; i++) {
      if ('(' === operation[i]) {
        isOpen = true;
      } else if (isOpen && ')' === operation[i]) {
        isOpen = false;
      }
    }
    return isOpen;
  }

  /**
   * States if there's parenthesis left to close
   *
   * @returns {bool}
   */
  existsParenthesisToClose() {
    const operation = this.state.operation;
    let openParenthesisCount = 0;

    for (let i = 0; i < operation.length; i++) {
      if ('(' === operation[i]) {
        openParenthesisCount++;
      } else if (openParenthesisCount && ')' === operation[i]) {
        openParenthesisCount--;
      }
    }

    return !!openParenthesisCount;
  }

  isSymbolPossible(symbol) {

    const lastSymbol = this.getLastSymbol();

    // if empty operation or leading (
    if (null === lastSymbol || '(' === lastSymbol) {
      if (!isNaN(symbol) || '(' === symbol) {
        return true;
      }
    // if leading ) - allow only operators and ) if theres is ( to close
    } else if (')' === lastSymbol) {
      if (isNaN(symbol) && '(' !== symbol && ')' !== symbol) {
        return true;
      } else if (')' === symbol && this.existsParenthesisToClose()) {
        return true;
      }
    // if leading number - allow operator, except (
    } else if (null !== lastSymbol && !isNaN(lastSymbol)) {

      if (')' === symbol && this.existsParenthesisToClose()) {
        return true;
      } else if (isNaN(symbol) && '(' !== symbol && ')' !== symbol) {
        return true;
      }
    // if leading operator [+-*/] - allow only numbers and (
    } else if (isNaN(lastSymbol)) {
      if (!isNaN(symbol) || '(' === symbol) {
        return true;
      }
    }

    return false;
  }
}

export default Calculator;
