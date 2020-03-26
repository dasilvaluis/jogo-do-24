import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../Card';
import Calculator from '../Calculator';
import {
  CardActions,
  CalculationActions,
  NumbersActions,
} from '../../actions';
import {
  isSymbolPossible,
  isParenthesisOpen,
  getRandomCard,
} from '../../utils';
import './Board.scss';

class Board extends Component {
  constructor(props) {
    super(props);

    this.CORRECT_RESULT = 24;
    this.MAXIMUM_NUMBERS = 4;

    this.calculator = React.createRef();
  }

  componentDidMount() {
    const storedDifficulty = localStorage.getItem('24game_difficulty');
    const difficulty = storedDifficulty !== null
      ? parseInt(storedDifficulty, 10)
      : this.props.difficulty;

    this.props.setCard(getRandomCard(difficulty));
  }

  /**
   * Gets random card from endpoint
   *
   * @returns {void}
   */
  loadRandomCard() {
    this.props.setCard(getRandomCard(this.props.difficulty));
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
    if (this.MAXIMUM_NUMBERS <= usedNumbers.length && !('(' === operator || ')' === operator)) {
      return;
    }

    // Push operator
    if (!isSymbolPossible(operator, operation)) {
      return;
    }

    this.props.addSymbol(operator);
    this.props.setReady(this.MAXIMUM_NUMBERS <= usedNumbers.length && !isParenthesisOpen(operation));
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
    const { card, usedNumbers, operation } = this.props;

    // Return if to many numbers or symbol not possible
    if (this.MAXIMUM_NUMBERS <= usedNumbers.length || !isSymbolPossible(number, operation)) {
      return;
    }

    this.props.addNumber(number);
    this.props.addSymbol(number);
    this.props.setReady(this.MAXIMUM_NUMBERS <= usedNumbers.length + 1 && !isParenthesisOpen(operation));

    const updatedNumbers = [...card.numbers];
    updatedNumbers[numberIndex].active = false;
    this.props.setCard({ ...card, numbers: updatedNumbers });
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
    const { card } = this.props;

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
            onOperatorClick={operator => this.registerOperator(operator)}
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
  difficulty: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  card: state.card,
  usedNumbers: state.usedNumbers,
  operation: state.operation,
  difficulty: state.difficulty,
});

const mapDispatchToProps = {
  setCard: CardActions.setCard,
  addSymbol: CalculationActions.addSymbol,
  addNumber: NumbersActions.addNumber,
  setReady: CalculationActions.setReady,
  resetOperation: CalculationActions.resetOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
