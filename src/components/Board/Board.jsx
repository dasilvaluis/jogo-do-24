import React, { Component } from 'react';
import Card from '../Card';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      currentCard: {}
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
        <Card numbers={currentCard.numbers} onReset={() => this.loadRandomCard()} />
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
          const random_array_index = Math.floor(Math.random() * Math.floor(cards.length));
          const card = cards[random_array_index];

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
}

export default Board;
