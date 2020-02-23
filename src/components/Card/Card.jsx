import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
    };
  }

  /**
   * Reset component state
   *
   * @returns {void}
   */
  reset() {
    this.setState({
      disabled: false,
    });
  }

  /**
   * Handle try card action
   *
   * @returns {void}
   */
  handleResetClick() {
    this.reset();
    this.props.onCardReset();
  }

  /**
   * Handle click on number
   *
   * @param {event} e DOM Event
   * @returns {void}
   */
  handleNumberClick(e) {
    const numberIndex = parseInt(e.target.getAttribute('data-index'), 10);
    const numberValue = parseInt(e.target.getAttribute('data-value'), 10);

    this.props.onNumberClick(numberValue, numberIndex);
  }

  render() {
    const { disabled } = this.state;
    const { card } = this.props;

    if (0 === card.numbers.length) {
      return <div>Loading...</div>;
    }

    return (
      <div className="card">
        <div className="card__grade">
          {Array(card.grade).fill(0).map(() => <span className="card__grade-point" /> )}
        </div>
        <div>
          <span className="card__triangle" />
          <span className="card__triangle" />
          <span className="card__triangle" />
          <span className="card__triangle" />
        </div>
        <button type="button" className="card__submit-button" onClick={() => this.handleResetClick()} />
        <div>
          {card.numbers.map((number, i) => (
            <button
              type="button"
              className="card__number"
              disabled={!number.active || disabled}
              data-index={i}
              data-value={number.value}
              onClick={e => this.handleNumberClick(e)}
              key={`${Math.random() * 100}-${number.value}`}
            >
              {number.value}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  onNumberClick: () => {},
  onCardReset: () => {},
};

Card.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  onNumberClick: PropTypes.func,
  onCardReset: PropTypes.func,
};

export default Card;
