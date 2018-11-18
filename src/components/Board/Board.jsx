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

  render() {
    const { error, isLoaded, currentCard } = this.state;
    if (error) {
      return <div>Borrada!</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div className="board">
        <Card ref={this.card} numbers={currentCard.numbers} grade={currentCard.grade}
          onTryCard={() => this.handleTryCard()}
          onNumberClicked={(number) => this.handleNumberClick(number)} />

        <Calculator ref={this.calculator}
          onReset={() => this.handleCalculatorReset()}
          onFinish={(result) => this.handleFinish(result)} />
      </div>
    )
  }

  componentDidMount() {
    this.loadRandomCard();
  }

  /**
   * Gets random card from endpoint
   */
  loadRandomCard() {
    fetch("./data/cards.json")
      .then(res => res.json())
      .then(
        (result) => {
          const cards = result.cards;
          const randomIndex = Math.floor(Math.random() * Math.floor(cards.length));
          let card = cards[randomIndex];

          this.setState({
            isLoaded: true,
            currentCard: card,
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      );
  }

  reset() {
    this.loadRandomCard();
    this.calculator.current.reset();
    this.card.current.reset();
  }

  /**
   * Handle 'TryCard' button click
   */
  handleTryCard() {
    this.reset();
  }

  /**
   * Registers number on calculator
   */
  handleNumberClick(number) {
    this.calculator.current.registerNumber(number);
  }

  /**
   * Handle Calculator reset
   */
  handleCalculatorReset() {
    this.card.current.reset();
  }

  /**
   * Handle calculations finished
   */
  handleFinish(result) {
    if (this.CORRECT_RESULT === result.value) {
      alert('Great! Your result is 24!');    }
    else {
      alert(`Wrong, ${result.solution} is not equal to 24! Go back to school!`);
    }
    this.reset();
  }
}

export default Board;
