import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OperationActions } from '../../actions';
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
  }

  /**
   * Reset Calculator
   *
   * @returns {void}
   */
  reset() {
    this.setState({
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
    this.props.resetOperation();
    this.props.onReset();
  }

  /**
   * Handle click on Submit button
   *
   * @returns {void}
   */
  handleSubmit() {
    const { operation } = this.props;
    if (!operation.length || isParenthesisOpen(operation)) { return; }

    const calc = operation.join('');

    // Return result to Board
    this.props.onFinish({
      solution: calc,
      value: getCalculationResult(calc),
    });
  }

  /**
   * Registers operator in the current operation
   *
   * @param {string} operator Operator string [+-/*()]
   * @returns {bool} Successful
   */
  registerOperator(operator) {
    const { usedNumbers, operation } = this.props;

    // Return if used all numbers
    if (this.MAXIMUM_NUMBERS <= usedNumbers.length && !('(' === operator || ')' === operator)) { return false; }

    // Push operator
    if (!isSymbolPossible(operator, operation)) {
      // error
      return false;
    }

    this.props.addSymbol(operator);
    this.props.setReady(this.MAXIMUM_NUMBERS <= usedNumbers.length && !isParenthesisOpen(operation));

    return true;
  }

  render() {
    const { isReady, operation } = this.props;

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
          <button type="button" className="calculator__submit" disabled={!isReady} onClick={() => this.handleSubmit()}>=</button>
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
  addSymbol: PropTypes.func.isRequired,
  resetOperation: PropTypes.func.isRequired,
  setReady: PropTypes.func.isRequired,
  usedNumbers: PropTypes.instanceOf(Array).isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  isReady: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  usedNumbers: state.usedNumbers,
  operation: state.operation,
  isReady: state.isReady,
});

const mapDispatchToProps = {
  addSymbol: OperationActions.addSymbol,
  resetOperation: OperationActions.resetOperation,
  setReady: OperationActions.setReady,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
