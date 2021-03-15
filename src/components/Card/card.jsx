import React from 'react';
import PropTypes from 'prop-types';
import CardBackground from '../../images/card-background.png';
import './card.scss';

export function Card({
  card,
  onCardReset,
  onNumberClick,
}) {
  if (!card.numbers.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <img src={ CardBackground } className="card__background" alt="background" />
      <div className="card__grade">
        { Array(card.grade).fill(0).map(() => <span key={ Math.random() * 100 } className="card__grade-point" />) }
      </div>
      <button className="card__submit-button" type="submit" tabIndex={ 0 } aria-label="Reset" onClick={ onCardReset } />
      <div>
        { card.numbers.map((number, index) => (
          <button
            type="button"
            className="card__number"
            disabled={ !number.active }
            onClick={ () => onNumberClick(number.value, index) }
            key={ `card--${ number.value }--${ number.uuid }` }
          >
            { number.value }
          </button>
        )) }
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  onNumberClick: PropTypes.func.isRequired,
  onCardReset: PropTypes.func.isRequired,
};
