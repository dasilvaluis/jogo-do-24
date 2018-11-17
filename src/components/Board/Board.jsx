import React, { Component } from 'react';
import Card from '../Card';
import Calculator from '../Calculator';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      currentCard: {},
    };

    this.calculator = React.createRef();
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
        <Card numbers={currentCard.numbers}
          onTryCard={() => this.handleTryCard()}
          onNumberClicked={(number) => this.handleNumberClick(number)} />
        <Calculator ref={this.calculator} />
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
    fetch("/data/cards.json")
      .then(res => res.json())
      .then(
        (result) => {
          const cards = result.cards;
          const randomIndex = Math.floor(Math.random() * Math.floor(cards.length));
          const card = cards[randomIndex];

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

  reset() {
    this.loadRandomCard();
    this.calculator.current.reset();
  }
}

export default Board;
