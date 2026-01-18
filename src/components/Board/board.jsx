import { useEffect, useState } from 'react';
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
  getRandomCard,
  isOpenParenthesis,
  isCloseParenthesis,
} from '../../utils';
import {
  CORRECT_RESULT,
  MAXIMUM_NUMBERS,
} from '../../constants';
import './board.scss';
import { getUsedNumbers, isOperationReady } from '../../state/selectors';

function ProtoBoard({
  card,
  usedNumbers,
  operation,
  difficulty,
  isReady,
  onSetCard,
  onAddSymbol,
  onRemoveLastSymbol,
  onResetOperation,
  onCorrect,
}) {
  const [lastSymbol] = operation.slice(-1);
  const [error, setError] = useState(null);

  function resetBoard() {
    const newRandomCard = getRandomCard(difficulty);
    onSetCard(newRandomCard);
    onResetOperation();
    setError(null);
  }

  useEffect(resetBoard, [difficulty]);

  function handleNumberClick(number, numberIndex) {
    const isNumberAllowed = typeof lastSymbol === 'undefined' ||
      isOperator(lastSymbol) ||
      isOpenParenthesis(lastSymbol);

    if (isNumberAllowed) {
      setError(null);
      onAddSymbol(number);
      const updatedNumbers = [...card.numbers];
      updatedNumbers[numberIndex].active = false;
      onSetCard({ ...card, numbers: updatedNumbers });
    }
  }

  function addOperatorToOperation(operator) {
    const isOperatorAllowed = MAXIMUM_NUMBERS > usedNumbers.length && (
      isNumeric(lastSymbol) || isCloseParenthesis(lastSymbol)
    );

    if (isOperatorAllowed) {
      setError(null);
      onAddSymbol(operator);
    }
  }

  function addParenthesisToOperation(paren) {
    setError(null);
    onAddSymbol(paren);
  }

  function handleCalculatorClear() {
    const updatedNumbers = card.numbers.map((el) => ({ ...el, active: true }));
    onSetCard({ ...card, numbers: updatedNumbers });
    onResetOperation();
    setError(null);
  }

  function handleBackspace() {
    if (!operation.length) return;
    const lastItem = operation[operation.length - 1];
    // If last item was a number, reactivate it on the card
    if (isNumeric(lastItem)) {
      const index = card.numbers.findIndex((n) => !n.active && n.value === lastItem);
      if (index !== -1) {
        const updatedNumbers = [...card.numbers];
        updatedNumbers[index].active = true;
        onSetCard({ ...card, numbers: updatedNumbers });
      }
    }
    onRemoveLastSymbol();
    setError(null);
  }

  function handleSubmit(result) {
    if (CORRECT_RESULT === result.value) {
      onCorrect(Number(card.grade));
      setError({ type: 'success', message: 'Correct! 🎉' });
      setTimeout(resetBoard, 1500);
    } else {
      setError({ type: 'error', message: `${result.solution} = ${result.value}, not 24!` });
    }
  }

  return (
    <div className="board">
      <Card
        card={card}
        onCardReset={resetBoard}
        onNumberClick={handleNumberClick}
      />
      <Calculator
        card={card}
        isReady={isReady}
        operation={operation}
        message={error}
        onSubmit={handleSubmit}
        onClear={handleCalculatorClear}
        onBackspace={handleBackspace}
        onNumberClick={handleNumberClick}
        onOperatorClick={addOperatorToOperation}
        onParenthesisClick={addParenthesisToOperation}
      />
    </div>
  );
}

ProtoBoard.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  isReady: PropTypes.bool.isRequired,
  usedNumbers: PropTypes.instanceOf(Array).isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  difficulty: PropTypes.number.isRequired,
  onSetCard: PropTypes.func.isRequired,
  onAddSymbol: PropTypes.func.isRequired,
  onRemoveLastSymbol: PropTypes.func.isRequired,
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
  onRemoveLastSymbol: CalculationActions.removeLastSymbol,
  onResetOperation: CalculationActions.resetOperation,
  onCorrect: ScoreActions.addPoint,
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(ProtoBoard);
