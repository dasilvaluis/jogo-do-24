import React, { Component } from 'react';

class Card extends Component {

  constructor(props) {
    super(props);
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
        <button className="card__submit-button" onClick={this.handleSubmitClick.bind(this)}></button>
        <div>
          <div className="card__number">{this.props.numbers[0]}</div>
          <div className="card__number">{this.props.numbers[1]}</div>
          <div className="card__number">{this.props.numbers[2]}</div>
          <div className="card__number">{this.props.numbers[3]}</div>
        </div>
      </div>
    )
  }

  handleSubmitClick() {
    this.props.onSubmit();
  }
}

Card.defaultProps = {
  numbers: [ 0, 0, 0, 0 ],
  grade: 0,
};

export default Card;
