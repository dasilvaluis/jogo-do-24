import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardBackground from '../../images/card-background.png';
import './card.scss';

export const Card = ({
  card,
  onCardReset,
  onNumberClick,
}) => {
  const [ disabled, setDisabled ] = useState(false);

  /**
   * Reset component state
   *
   * @returns {void}
   */
  const reset = () => {
    setDisabled(false);
  };

  /**
   * Handle try card action
   *
   * @returns {void}
   */
  const handleResetClick = () => {
    reset();
    onCardReset();
  };

  /**
   * Handle click on number
   *
   * @param {event} e DOM Event
   * @returns {void}
   */
  const handleNumberClick = (value, index) => {
    onNumberClick(value, index);
  };

  if (card.numbers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <img src={ CardBackground } className="card__background" alt="background" />
      <div className="card__grade">
        { Array(card.grade).fill(0).map(() => <span key={ Math.random() * 100 } className="card__grade-point" />) }
      </div>
      <div>
        <span className="card__triangle" />
        <span className="card__triangle" />
        <span className="card__triangle" />
        <span className="card__triangle" />
      </div>
      <button className="card__submit-button" type="submit" tabIndex={ 0 } aria-label="Reset" onClick={ handleResetClick } />
      <div>
        { card.numbers.map((number, index) => (
          <button
            type="button"
            className="card__number"
            disabled={ !number.active || disabled }
            onClick={ () => handleNumberClick(number.value, index) }
            key={ `card--${ number.value }--${ number.uuid }` }
          >
            { number.value }
          </button>
        )) }
      </div>
    </div>
  );
};

Card.defaultProps = {
  onNumberClick: () => {},
  onCardReset: () => {},
};

Card.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  onNumberClick: PropTypes.func,
  onCardReset: PropTypes.func,
};
