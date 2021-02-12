import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DifficultyActions, CardActions, CalculationActions } from '../../actions';
import { getRandomCard } from '../../utils';
import { LOCAL_STORAGE_DIFFICULTY } from '../../constants';

const ProtoDifficultySetter = (props) => {
  useEffect(() => {
    const difficulty = localStorage.getItem(LOCAL_STORAGE_DIFFICULTY);

    if (difficulty !== null) {
      props.onSetDifficulty(parseInt(difficulty, 10));
    }
  }, []);

  const handleChange = (event) => {
    const difficulty = parseInt(event.target.value, 10);

    props.onSetDifficulty(difficulty);
    props.onSetCard(getRandomCard(difficulty));
    props.onResetOperation();
    localStorage.setItem(LOCAL_STORAGE_DIFFICULTY, difficulty);
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

ProtoDifficultySetter.propTypes = {
  difficulty: PropTypes.number.isRequired,
  onSetDifficulty: PropTypes.func.isRequired,
  onSetCard: PropTypes.func.isRequired,
  onResetOperation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  difficulty: state.difficulty,
});

const mapDispatchToProps = {
  onSetDifficulty: DifficultyActions.setDifficulty,
  onSetCard: CardActions.setCard,
  onResetOperation: CalculationActions.resetOperation,
};

export const DifficultySetter = connect(mapStateToProps, mapDispatchToProps)(ProtoDifficultySetter);
