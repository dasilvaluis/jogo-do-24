import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from '../Card';
import { Calculator } from '../Calculator';
import {
  CardActions,
  CalculationActions,
  ScoreActions,
} from '../../state/actions';
import {
  isNumeric,
  isOperator,
  isParenthesisOpen,
  getRandomCard,
  isParenthesis,
} from '../../utils';
import {
  CORRECT_RESULT,
  LOCAL_STORAGE_DIFFICULTY,
  MAXIMUM_NUMBERS,
  PARENTHESIS,
  SYMBOLS,
} from '../../constants';
import './board.scss';
import { getUsedNumbers, isOperationReady } from '../../state/selectors';

const ProtoBoard = ({
  card,
  usedNumbers,
  operation,
  difficulty,
  isReady,
  onSetCard,
  onAddSymbol,
  onResetOperation,
  onCorrect,
}) => {
  useEffect(() => {
    const storedDifficulty = localStorage.getItem(LOCAL_STORAGE_DIFFICULTY);
    const targetDifficulty = storedDifficulty ? parseInt(storedDifficulty, 10) : difficulty;

    onSetCard(getRandomCard(targetDifficulty));
  }, []);

  const loadRandomCard = () => {
    onSetCard(getRandomCard(difficulty));
  };

  const handleNumberClick = (number, numberIndex) => {
    const [ lastSymbol ] = operation.slice(-1);

    // Return if to many numbers or symbol not possible
    if (
      MAXIMUM_NUMBERS <= usedNumbers.length ||
      isNumeric(lastSymbol) ||
      lastSymbol === PARENTHESIS.CLOSE
    ) {
      return;
    }

    onAddSymbol(number);

    const updatedNumbers = [ ...card.numbers ];
    updatedNumbers[numberIndex].active = false;

    onSetCard({ ...card, numbers: updatedNumbers });
  };

  const handleOperatorClick = (operator) => {
    // Return if used all numbers
    if (MAXIMUM_NUMBERS <= usedNumbers.length && operator !== SYMBOLS.PARENTHESIS) {
      return;
    }

    const [ lastSymbol ] = operation.slice(-1);

    if (typeof lastSymbol !== 'undefined' && (isNumeric(lastSymbol) || lastSymbol === PARENTHESIS.CLOSE)) {
      onAddSymbol(operator);
    }
  };

  const handleParenthesisClick = () => {
    const [ lastSymbol ] = operation.slice(-1);

    if (typeof lastSymbol === 'undefined' || isOperator(lastSymbol) || lastSymbol === PARENTHESIS.OPEN) {
      onAddSymbol(PARENTHESIS.OPEN);
    } else if (
      (isNumeric(lastSymbol) || isParenthesis(lastSymbol)) && isParenthesisOpen(operation)
    ) {
      onAddSymbol(PARENTHESIS.CLOSE);
    }
  };

  const reset = () => {
    loadRandomCard();
    onResetOperation();
  };

  const handleCalculatorClear = () => {
    const updatedNumbers = card.numbers.map((el) => ({ ...el, active: true }));

    onSetCard({ ...card, numbers: updatedNumbers });
    onResetOperation();
  };

  const handleSubmit = (result) => {
    if (CORRECT_RESULT === result.value) {
      onCorrect(Number(card.grade));
    }

    reset();
  };

  return (
    <div className="board">
      <Card
        card={ card }
        onCardReset={ reset }
        onNumberClick={ handleNumberClick }
      />
      <Calculator
        card={ card }
        operation={ operation }
        isReady={ isReady }
        onClear={ handleCalculatorClear }
        onSubmit={ handleSubmit }
        onNumberClick={ handleNumberClick }
        onOperatorClick={ handleOperatorClick }
        onParenthesisClick={ handleParenthesisClick }
      />
    </div>
  );
};

ProtoBoard.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  isReady: PropTypes.bool.isRequired,
  usedNumbers: PropTypes.instanceOf(Array).isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  difficulty: PropTypes.number.isRequired,
  onSetCard: PropTypes.func.isRequired,
  onAddSymbol: PropTypes.func.isRequired,
  onResetOperation: PropTypes.func.isRequired,
  onCorrect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  card: state.card,
  isReady: isOperationReady(state),
  usedNumbers: getUsedNumbers(state),
  operation: state.operation,
  difficulty: state.difficulty,
});

const mapDispatchToProps = {
  onSetCard: CardActions.setCard,
  onAddSymbol: CalculationActions.addSymbol,
  onResetOperation: CalculationActions.resetOperation,
  onCorrect: ScoreActions.addPoint,
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(ProtoBoard);
