import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../Card';
import Calculator from '../Calculator';
import { CardActions, OperationActions, NumbersActions } from '../../actions';
import { cards } from '../../data/cards';
import { isSymbolPossible, isParenthesisOpen } from '../../Helpers';

class Board extends Component {
  constructor(props) {
    super(props);

    this.CORRECT_RESULT = 24;
    this.MAXIMUM_NUMBERS = 4;

    this.calculator = React.createRef();
  }

  componentDidMount() {
    this.loadRandomCard();
  }

  /**
   * Gets random card from endpoint
   *
   * @returns {void}
   */
  loadRandomCard() {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = { ...cards[randomIndex] };
    card.numbers = card.numbers.map(el => ({
      value: el,
      active: true,
    }));

    this.props.setCard(card);
  }

  /**
   * Registers number in the current operation
   *
   * @param {number} number Number to register
   * @returns {bool} Successful
   */
  registerNumber(number) {
    const { usedNumbers, operation } = this.props;

    // Return if to many numbers
    if (this.MAXIMUM_NUMBERS <= usedNumbers.length) { return false; }

    // Push number
    if (!isSymbolPossible(number, operation)) {
      // error
      return false;
    }

    this.props.addNumber(number);
    this.props.addSymbol(number);
    this.props.setReady(this.MAXIMUM_NUMBERS <= usedNumbers.length + 1 && !isParenthesisOpen(operation));

    return true;
  }

  reset() {
    this.loadRandomCard();
    this.props.resetOperation();
  }

  /**
   * Handle 'TryCard' button click
   *
   * @returns {void}
   */
  handleCardReset() {
    this.reset();
  }

  /**
   * Number click handler
   *
   * @param {number} number Clicked number
   * @param {number} numberIndex  Index of clicked number
   * @returns {void}
   */
  handleNumberClick(number, numberIndex) {
    const {
      card,
    } = this.props;

    // Register number in calculator
    if (this.registerNumber(number)) {
      const updatedNumbers = [...card.numbers];
      updatedNumbers[numberIndex].active = false;
      this.props.setCard({ ...card, numbers: updatedNumbers });
    }
  }

  /**
   * Handle Calculator reset
   *
   * @returns {void}
   */
  handleCalculatorReset() {
    const {
      card,
    } = this.props;

    const updatedNumbers = card.numbers.map((el) => {
      el.active = true;
      return el;
    });
    this.props.setCard({ ...card, numbers: updatedNumbers });
  }

  /**
   *
   * @param {objec} result Object containing result value and result calculation
   * @returns {void}
   */
  handleFinish(result) {
    if (this.CORRECT_RESULT === result.value) {
      alert('Great! Your result is 24!');
    } else {
      alert(`Wrong, ${result.solution} is not equal to 24! Go back to school!`);
    }
    this.reset();
  }

  render() {
    const {
      card,
    } = this.props;

    return (
      <div className="board">
        <div>
          <Card
            card={card}
            onCardReset={() => this.handleCardReset()}
            onNumberClick={(number, index) => this.handleNumberClick(number, index)}
          />
        </div>
        <div>
          <Calculator
            onReset={() => this.handleCalculatorReset()}
            onFinish={result => this.handleFinish(result)}
          />
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  setCard: PropTypes.func.isRequired,
  addSymbol: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
  setReady: PropTypes.func.isRequired,
  resetOperation: PropTypes.func.isRequired,
  usedNumbers: PropTypes.instanceOf(Array).isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  card: state.card,
  usedNumbers: state.usedNumbers,
  operation: state.operation,
});

const mapDispatchToProps = {
  setCard: CardActions.setCard,
  addSymbol: OperationActions.addSymbol,
  addNumber: NumbersActions.addNumber,
  setReady: OperationActions.setReady,
  resetOperation: OperationActions.resetOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
