import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CalculationActions } from '../../actions';
import { isNumeric, isParenthesisOpen } from '../../utils';

class Calculator extends Component {
  constructor(props) {
    super(props);

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
   * Returns numeric result of string arithmetic calculation
   * Expected format: 4+2/6-1; 5-3*9/1; ...
   *
   * @param {string} calcString String representing the operation
   * @returns {number} Resulting integer, 0 on error
   */
  getCalculationResult = (calcString) => {
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
  handleOperatorClick(e) {
    const operatorValue = e.target.getAttribute('data-operator');
    this.props.onOperatorClick(operatorValue);
  }

  /**
   * Handle click o Clear button
   *
   * @returns {void}
   */
  handleClear() {
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
      value: this.getCalculationResult(calc),
    });
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
  onOperatorClick: () => {},
};

Calculator.propTypes = {
  onReset: PropTypes.func,
  onFinish: PropTypes.func,
  onOperatorClick: PropTypes.func,
  resetOperation: PropTypes.func.isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  isReady: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  usedNumbers: state.usedNumbers,
  operation: state.operation,
  isReady: state.isReady,
});

const mapDispatchToProps = {
  addSymbol: CalculationActions.addSymbol,
  resetOperation: CalculationActions.resetOperation,
  setReady: CalculationActions.setReady,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
