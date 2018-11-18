import React, { Component } from 'react';

class Calculator extends Component {

  constructor(props) {
    super(props);

    this.MAXIMUM_NUMBERS = 4;
    this.MAXIMUM_OPERATIONS = 3;

    this.state = {
      complete: false,
      numbers: [],
      operations: [],
    };
  }

  render() {
    const { numbers, operations, complete } = this.state;
    return (
      <div className="calculator">
        <div className="calculator__input-container">
          <input className="calculator__input" type="number" value={numbers[0] ? numbers[0] : ''} disabled/>
          <input className="calculator__input -small" value={operations[0] ? operations[0] : ''} disabled/>
          <input className="calculator__input" type="number" value={numbers[1] ? numbers[1] : ''} disabled/>
          <input className="calculator__input -small" value={operations[1] ? operations[1] : ''} disabled/>
          <input className="calculator__input" type="number" value={numbers[2] ? numbers[2] : ''} disabled/>
          <input className="calculator__input -small" value={operations[2] ? operations[2] : ''} disabled/>
          <input className="calculator__input" type="number" value={numbers[3] ? numbers[3] : ''} disabled/>
        </div>
        <div className="calculator__controls">
          <div className="calculator__operations-selector">
            <button className="calculator__button" onClick={(e) => this.handleOperationClick(e)} data-operation="+">+</button>
            <button className="calculator__button" onClick={(e) => this.handleOperationClick(e)} data-operation="-">-</button>
            <button className="calculator__button" onClick={(e) => this.handleOperationClick(e)} data-operation="/">/</button>
            <button className="calculator__button" onClick={(e) => this.handleOperationClick(e)} data-operation="*">x</button>
          </div>
          <button className="calculator__submit" onClick={() => this.handleClear()}>Clear</button>
          <button className="calculator__submit" disabled={!complete} onClick={() => this.handleSubmit()}>Am I Smart?</button>
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
      operations: [],
    });
  }

  registerNumber(number) {
    let _numbers = this.state.numbers;
    let _operations = this.state.operations;

    // Return if to many numbers
    if ( this.MAXIMUM_NUMBERS <= _numbers.length ) { return; }

    // Push number
    _numbers.push(number);
    this.setState({
      complete: this.MAXIMUM_OPERATIONS === _operations.length && this.MAXIMUM_NUMBERS === _numbers.length,
      numbers: _numbers,
    });
  }

  registerOperation(operation) {
    let _operations = this.state.operations;
    let _numbers = this.state.numbers;

    // Return if to many operations
    if ( this.MAXIMUM_OPERATIONS <= _operations.length ) { return; }

    // Push operation
    _operations.push(operation);
    this.setState({
      complete: this.MAXIMUM_OPERATIONS === _operations.length && this.MAXIMUM_NUMBERS === _numbers.length,
      operations: _operations,
    });
  }

  /**
   * Handle Operation button click
   */
  handleOperationClick(e) {
    const operationValue = e.target.getAttribute('data-operation');
    this.registerOperation(operationValue);
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
    const { numbers, operations, complete } = this.state;
    if (!complete) { return; }

    let calc = '';
    for (let i = 0; i < numbers.length; i++) {
      if (0 === i) {
        calc = `${calc}${numbers[i]}`
      } else {
        calc = `${calc}${operations[i-1]}${numbers[i]}`
      }
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
   * @param {string} calc_string
   */
  getResult(calc_string) {
    if (!this.validateCalcString(calc_string)) { return; }
    return eval(calc_string)
  }

  /**
   * Validate the structure of a calc string such as 1*2/3+5
   *
   * @param {String} calc_string
   */
  validateCalcString(calc_string) {
    if (/^(\d+[+*/-]{1}){3}\d{1}$/.test(calc_string)) {
      return true;
    }
    return false;
  }
}

export default Calculator;
