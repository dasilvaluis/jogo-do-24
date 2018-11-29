import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      numberButtons: [
        { disabled: false },
        { disabled: false },
        { disabled: false },
        { disabled: false },
      ],
    };
  }

  /**
   * Reset component state
   *
   * @returns {void}
   */
  reset() {
    // Reset disabled state
    let { numberButtons } = this.state;
    numberButtons = [
      { disabled: false },
      { disabled: false },
      { disabled: false },
      { disabled: false },
    ];

    this.setState({
      numberButtons,
    });
  }

  /**
   * Handle try card action
   *
   * @returns {void}
   */
  handleResetCard() {
    this.reset();

    // Parent callback functions
    this.props.onResetCard();
  }

  /**
   * Handle click on number
   *
   * @param {event} e DOM Event
   * @returns {void}
   */
  handleNumberClick(e) {
    const { numberButtons } = this.state;
    // Disabled clicked number
    const numberIndex = e.target.getAttribute('data-index');
    numberButtons[numberIndex].disabled = true;

    // Set State
    this.setState({
      numberButtons,
    });

    // Parent callback functions
    const numberValue = e.target.getAttribute('data-value');
    this.props.onNumberClicked(numberValue);
  }

  render() {
    const { disabled, numberButtons } = this.state;
    const { numbers } = this.props;

    return (
      <div className="card">
        <div>
          <span className="card__triangle" />
          <span className="card__triangle" />
          <span className="card__triangle" />
          <span className="card__triangle" />
        </div>
        <button type="button" className="card__submit-button" onClick={() => this.handleResetCard()} />
        <div>
          <button
            type="button"
            className="card__number"
            disabled={numberButtons[0].disabled || disabled}
            data-index="0"
            data-value={numbers[0]}
            onClick={e => this.handleNumberClick(e)}
          >
            {numbers[0]}
          </button>
          <button
            type="button"
            className="card__number"
            disabled={numberButtons[1].disabled || disabled}
            data-index="1"
            data-value={numbers[1]}
            onClick={e => this.handleNumberClick(e)}
          >
            {numbers[1]}
          </button>
          <button
            type="button"
            className="card__number"
            disabled={numberButtons[2].disabled || disabled}
            data-index="2"
            data-value={numbers[2]}
            onClick={e => this.handleNumberClick(e)}
          >
            {numbers[2]}
          </button>
          <button
            type="button"
            className="card__number"
            disabled={numberButtons[3].disabled || disabled}
            data-index="3"
            data-value={numbers[3]}
            onClick={e => this.handleNumberClick(e)}
          >
            {numbers[3]}
          </button>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  numbers: [0, 0, 0, 0],
  grade: 0,
  onNumberClicked: () => {},
  onResetCard: () => {},
};

Card.propTypes = {
  numbers: PropTypes.instanceOf(Array),
  grade: PropTypes.number,
  onNumberClicked: PropTypes.func,
  onResetCard: PropTypes.func,
};

export default Card;
