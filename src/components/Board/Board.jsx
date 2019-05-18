import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../Card';
import Calculator from '../Calculator';
import CardActions from '../../actions/CardActions';
import CalculatorActions from '../../actions/CalculatorActions';
import { cards } from '../../data/cards';

class Board extends Component {
  constructor(props) {
    super(props);

    this.CORRECT_RESULT = 24;

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

  reset() {
    this.loadRandomCard();
    this.calculator.current.reset();
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
   * @param {number} index  Index of clicked number
   * @returns {void}
   */
  handleNumberClick(number, numberIndex) {
    const {
      card,
    } = this.props;

    // Register number in calculator
    const wasNumberInserted = this.calculator.current.registerNumber(number);

    if (wasNumberInserted) {
      const updatedNumbers = card.numbers.map((el, i) => {
        if (i !== numberIndex) {
          return el;
        }

        return {
          ...el,
          active: false,
        };
      });

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
            ref={this.calculator}
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
};

const mapStateToProps = state => ({
  card: state.card,
  operation: state.operation,
});

const mapDispatchToProps = {
  setCard: CardActions.setCard,
  setOperation: CalculatorActions.setOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
