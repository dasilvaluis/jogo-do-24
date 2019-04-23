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
    const numberIndex = e.target.getAttribute('data-index');
    const numberValue = e.target.getAttribute('data-value');

    // Parent callback functions
    this.props.onNumberClick(numberValue, numberIndex);
  }

  render() {
    const { disabled } = this.state;
    const { numbers, disabledNumbers } = this.props;

    if (0 === numbers.length) {
      return <div>Loading...</div>;
    }

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
          {
            numbers.map(
              (number, i) => (
                <button
                  type="button"
                  className="card__number"
                  disabled={disabledNumbers[i] || disabled}
                  data-index={i}
                  data-value={number}
                  onClick={e => this.handleNumberClick(e)}
                  key={`${Math.random() * 100}-${number}`}
                >
                  {number}
                </button>
              ),
            )
          }
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  numbers: [0, 0, 0, 0],
  disabledNumbers: [false, false, false, false],
  onNumberClick: () => {},
  onResetCard: () => {},
};

Card.propTypes = {
  numbers: PropTypes.instanceOf(Array),
  onNumberClick: PropTypes.func,
  onResetCard: PropTypes.func,
  disabledNumbers: PropTypes.instanceOf(Array),
};

export default Card;
