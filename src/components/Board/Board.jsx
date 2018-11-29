import React, { Component } from 'react';
import Card from '../Card';
import Calculator from '../Calculator';

class Board extends Component {
  constructor(props) {
    super(props);

    this.CORRECT_RESULT = 24;

    this.calculator = React.createRef();
    this.card = React.createRef();

    this.state = {
      error: null,
      isLoaded: false,
      currentCard: {},
    };
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
    fetch('./data/cards.json')
      .then(res => res.json())
      .then(
        (result) => {
          const { cards } = result;
          const randomIndex = Math.floor(Math.random() * Math.floor(cards.length));
          const card = cards[randomIndex];

          this.setState({
            isLoaded: true,
            currentCard: card,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  reset() {
    this.loadRandomCard();
    this.calculator.current.reset();
    this.card.current.reset();
  }

  /**
   * Handle 'TryCard' button click
   *
   * @returns {void}
   */
  handleResetCard() {
    this.reset();
  }

  /**
   * Number click handler
   *
   * @param {number} number Number clicked
   * @returns {void}
   */
  handleNumberClick(number) {
    this.calculator.current.registerNumber(number);
  }

  /**
   * Handle Calculator reset
   *
   * @returns {void}
   */
  handleCalculatorReset() {
    this.card.current.reset();
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
    const { error, isLoaded, currentCard } = this.state;

    if (error) {
      return <div>Borrada!</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div className="board">
        <div>
          <Card
            ref={this.card}
            numbers={currentCard.numbers}
            grade={currentCard.grade}
            onResetCard={() => this.handleResetCard()}
            onNumberClicked={number => this.handleNumberClick(number)}
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

export default Board;
