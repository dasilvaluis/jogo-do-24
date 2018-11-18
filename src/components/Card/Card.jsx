import React, { Component } from 'react';

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      numberButtons: [
        { disabled: false },
        { disabled: false },
        { disabled: false },
        { disabled: false }
      ],
    };
  }

  render() {
    const { disabled, numberButtons } = this.state;
    return (
      <div className="card">
        <div>
          <span className="card__triangle"></span>
          <span className="card__triangle"></span>
          <span className="card__triangle"></span>
          <span className="card__triangle"></span>
        </div>
        <button className="card__submit-button" onClick={() => this.handleTryCard()}></button>
        <div>
          <button className="card__number" disabled={numberButtons[0].disabled || disabled}
              data-index="0"
              data-value={this.props.numbers[0]}
              onClick={(e) => this.handleNumberClick(e)}>
            {this.props.numbers[0]}
          </button>
          <button className="card__number" disabled={numberButtons[1].disabled || disabled}
              data-index="1"
              data-value={this.props.numbers[1]}
              onClick={(e) => this.handleNumberClick(e)}>
            {this.props.numbers[1]}
          </button>
          <button className="card__number" disabled={numberButtons[2].disabled || disabled}
              data-index="2"
              data-value={this.props.numbers[2]}
              onClick={(e) => this.handleNumberClick(e)}>
            {this.props.numbers[2]}
          </button>
          <button className="card__number" disabled={numberButtons[3].disabled || disabled}
              data-index="3"
              data-value={this.props.numbers[3]}
              onClick={(e) => this.handleNumberClick(e)}>
            {this.props.numbers[3]}
          </button>
        </div>
      </div>
    )
  }

  reset() {
    // Reset disabled state
    let _numberButtons = this.state.numberButtons;
    _numberButtons.map((x) => x.disabled = false)

    this.setState({
      numberButtons: _numberButtons
    });
  }

  handleTryCard() {
    this.reset();

    // Parent callback functions
    this.props.onTryCard();
  }

  handleNumberClick(e) {
    // Disabled clicked number
    const numberIndex = e.target.getAttribute('data-index');
    let _numberButtons = this.state.numberButtons;
    _numberButtons[numberIndex].disabled = true;

    // Set State
    this.setState({
      numberButtons: _numberButtons
    });

    // Parent callback functions
    const numberValue = e.target.getAttribute('data-value');
    this.props.onNumberClicked(numberValue);
  }
}

Card.defaultProps = {
  numbers: [ 0, 0, 0, 0 ],
  grade: 0,
};

export default Card;
