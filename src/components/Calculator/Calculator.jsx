import React, { Component } from 'react';

class Calculator extends Component {

  constructor(props) {
    super(props);

    this.possibleOperations = {
      add: '+',
      subtract: '-',
      divide: '/',
      multiply: 'x'
    };

    this.state = {
      numbers: [],
      operations: [],
    };
  }

  render() {
    const { numbers, operations } = this.state;

    return (
      <div className="calculator">
        <input className="calculator__input calculator__number" value={numbers[0] ? numbers[0] : ''} disabled/>
        <input className="calculator__input calculator__operation" value={operations[0] ? operations[0] : ''} disabled/>
        <input className="calculator__input calculator__number" value={numbers[1] ? numbers[1] : ''} disabled/>
        <input className="calculator__input calculator__operation" value={operations[1] ? operations[1] : ''} disabled/>
        <input className="calculator__input calculator__number" value={numbers[2] ? numbers[2] : ''} disabled/>
        <input className="calculator__input calculator__operation" value={operations[2] ? operations[2] : ''} disabled/>
        <input className="calculator__input calculator__number" value={numbers[3] ? numbers[3] : ''} disabled/>
      </div>
    )
  }

  registerNumber(number) {
    // Push number to numbers array
    let _numbers = this.state.numbers;
    _numbers.push(number);

    this.setState({
      numbers: _numbers,
    });
  }

  registerOperation(operation) {
    // Push number to numbers array
    let _operations = this.state.operations;
    _operations.push(operation);

    // Set state
    this.setState({
      operations: _operations,
    });
  }

  reset() {
    this.setState({
      numbers: [],
      operations: [],
    });
  }
}

export default Calculator;
