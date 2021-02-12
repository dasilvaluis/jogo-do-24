import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DifficultyActions, CardActions, CalculationActions } from '../../state/actions';
import { getRandomCard } from '../../utils';
import { LOCAL_STORAGE_DIFFICULTY } from '../../constants';

const ProtoDifficultySetter = ({
  difficulty,
  onSetDifficulty,
  onSetCard,
  onResetOperation,
}) => {
  useEffect(() => {
    const settedDifficulty = localStorage.getItem(LOCAL_STORAGE_DIFFICULTY);

    if (settedDifficulty) {
      onSetDifficulty(parseInt(difficulty, 10));
    }
  }, []);

  const handleChange = ({ target: { value } }) => {
    const newDifficulty = parseInt(value, 10);

    onSetDifficulty(newDifficulty);
    onSetCard(getRandomCard(newDifficulty));
    onResetOperation();
    localStorage.setItem(LOCAL_STORAGE_DIFFICULTY, newDifficulty);
  };

  return (
    <select name="difficulty-selection" value={ difficulty } onChange={ handleChange }>
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

const mapStateToProps = (state) => ({
  difficulty: state.difficulty,
});

const mapDispatchToProps = {
  onSetDifficulty: DifficultyActions.setDifficulty,
  onSetCard: CardActions.setCard,
  onResetOperation: CalculationActions.resetOperation,
};

export const DifficultySetter = connect(mapStateToProps, mapDispatchToProps)(ProtoDifficultySetter);
