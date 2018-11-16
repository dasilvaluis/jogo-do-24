import React, { Component } from 'react';

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disbaled: false,
      numberButtons: [
        {
          disabled: false
        },
        {
          disabled: false
        },
        {
          disabled: false
        },
        {
          disabled: false
        }
      ],
    };
  }

  render() {
    return (
      <div className="card">
        <div>
          <span className="card__triangle"></span>
          <span className="card__triangle"></span>
          <span className="card__triangle"></span>
          <span className="card__triangle"></span>
        </div>
        <button className="card__submit-button" onClick={() => this.handleSubmitClick()}></button>
        <div>
          <button className="card__number" disabled={this.state.numberButtons[0].disabled} data-value={this.props.numbers[0]} data-index="0"
              onClick={(e) => this.handleNumberClick(e)}>
            {this.props.numbers[0]}
          </button>
          <button className="card__number" disabled={this.state.numberButtons[1].disabled} data-value={this.props.numbers[1]} data-index="1"
              onClick={(e) => this.handleNumberClick(e)}>
            {this.props.numbers[1]}
          </button>
          <button className="card__number" disabled={this.state.numberButtons[2].disabled} data-value={this.props.numbers[2]} data-index="2"
              onClick={(e) => this.handleNumberClick(e)}>
            {this.props.numbers[2]}
          </button>
          <button className="card__number" disabled={this.state.numberButtons[3].disabled} data-value={this.props.numbers[3]} data-index="3"
              onClick={(e) => this.handleNumberClick(e)}>
            {this.props.numbers[3]}
          </button>
        </div>
      </div>
    )
  }

  handleSubmitClick() {

    let _numberButtons = this.state.numberButtons;
    _numberButtons.map((x) => x.disabled = false)
    this.setState({
      numberButtons: _numberButtons
    });

    this.props.onReset();
  }

  handleNumberClick(e) {
    const buttonIndex = e.target.getAttribute('data-index');
    let _numberButtons = this.state.numberButtons;
    _numberButtons[buttonIndex].disabled = true;
    this.setState({
      numberButtons: _numberButtons
    });
  }
}

Card.defaultProps = {
  numbers: [ 0, 0, 0, 0 ],
  grade: 0,
};

export default Card;
