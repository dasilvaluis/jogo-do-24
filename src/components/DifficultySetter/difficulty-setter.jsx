import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DifficultyActions } from '../../state/actions';
import { getStoredDifficulty, setStoredDifficulty } from '../../utils';

function ProtoDifficultySetter({
  difficulty,
  onSetDifficulty,
}) {
  useEffect(() => {
    const settedDifficulty = getStoredDifficulty();

    if (settedDifficulty) {
      onSetDifficulty(settedDifficulty);
    }
  }, []);

  function handleChange({ target: { value } }) {
    const newDifficulty = parseInt(value, 10);

    setStoredDifficulty(newDifficulty);
    onSetDifficulty(newDifficulty);
  }

  return (
    <select name="difficulty-selection" value={ difficulty } onChange={ handleChange }>
      <option value="0">All</option>
      <option value="1">Easy</option>
      <option value="2">Medium</option>
      <option value="3">Hard</option>
    </select>
  );
}

ProtoDifficultySetter.propTypes = {
  difficulty: PropTypes.number.isRequired,
  onSetDifficulty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  difficulty: state.difficulty,
});

const mapDispatchToProps = {
  onSetDifficulty: DifficultyActions.setDifficulty,
};

export const DifficultySetter = connect(mapStateToProps, mapDispatchToProps)(ProtoDifficultySetter);
