import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DifficultyActions, CardActions, CalculationActions } from '../../actions';
import { getRandomCard } from '../../utils';

const Difficulty = (props) => {
  useEffect(() => {
    const difficulty = localStorage.getItem('24game_difficulty');

    if (difficulty !== null) {
      props.setDifficulty(parseInt(difficulty, 10));
    }
  }, []);

  const handleChange = (event) => {
    const difficulty = parseInt(event.target.value, 10);

    props.setDifficulty(difficulty);
    props.setCard(getRandomCard(difficulty));
    props.resetOperation();
    localStorage.setItem('24game_difficulty', difficulty);
  };

  return (
    <select name="difficulty-selection" value={props.difficulty} onChange={handleChange}>
      <option value="-1">All</option>
      <option value="1">Easy</option>
      <option value="2">Medium</option>
      <option value="3">Hard</option>
    </select>
  );
};

Difficulty.propTypes = {
  difficulty: PropTypes.number.isRequired,
  setDifficulty: PropTypes.func.isRequired,
  setCard: PropTypes.func.isRequired,
  resetOperation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  difficulty: state.difficulty,
});

const mapDispatchToProps = {
  setDifficulty: DifficultyActions.setDifficulty,
  setCard: CardActions.setCard,
  resetOperation: CalculationActions.resetOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Difficulty);
