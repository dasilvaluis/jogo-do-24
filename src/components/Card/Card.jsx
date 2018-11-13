import React, { Component } from 'react';

class Card extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="card__number">{this.props.numbers[0]}</div>
        <div className="card__number">{this.props.numbers[1]}</div>
        <div className="card__number">{this.props.numbers[2]}</div>
        <div className="card__number">{this.props.numbers[3]}</div>
        <span className="card__triangle"></span>
        <span className="card__triangle"></span>
        <span className="card__triangle"></span>
        <span className="card__triangle"></span>
        <button className="card__submit-button"></button>
      </div>
    )
  }
}

Card.defaultProps = {
  numbers: [ 0, 0, 0, 0 ],
  grade: 0,
};

export default Card;
