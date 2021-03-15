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
  isOpenParenthesis,
  isCloseParenthesis,
} from '../../utils';
import {
  CORRECT_RESULT,
  MAXIMUM_NUMBERS,
  PARENTHESIS,
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
  onResetOperation,
  onCorrect,
}) {
  const [ lastSymbol ] = operation.slice(-1);

  function resetBoard() {
    const newRandomCard = getRandomCard(difficulty);

    onSetCard(newRandomCard);
    onResetOperation();
  }

  useEffect(resetBoard, [ difficulty ]);

  function handleNumberClick(number, numberIndex) {
    const isNumberAllowed = typeof lastSymbol === 'undefined' || isOperator(lastSymbol);

    if (isNumberAllowed) {
      onAddSymbol(number);

      const updatedNumbers = [ ...card.numbers ];
      updatedNumbers[numberIndex].active = false;

      onSetCard({ ...card, numbers: updatedNumbers });
    }
  }

  function addOperatorToOperation(operator) {
    const isOperatorAllowed = MAXIMUM_NUMBERS > usedNumbers.length && (
      isNumeric(lastSymbol) || isCloseParenthesis(lastSymbol)
    );

    if (isOperatorAllowed) {
      onAddSymbol(operator);
    }
  }

  function addParenthesisToOperation() {
    const isOpenParenthesisAllowed = typeof lastSymbol === 'undefined' ||
      isOperator(lastSymbol) ||
      isOpenParenthesis(lastSymbol);

    const isCloseParenthesisAllowed = isParenthesisOpen(operation) && (
      isNumeric(lastSymbol) || isParenthesis(lastSymbol)
    );

    if (isOpenParenthesisAllowed) {
      onAddSymbol(PARENTHESIS.OPEN);
    } else if (isCloseParenthesisAllowed) {
      onAddSymbol(PARENTHESIS.CLOSE);
    }
  }

  function handleCalculatorClear() {
    const updatedNumbers = card.numbers.map((el) => ({ ...el, active: true }));

    onSetCard({ ...card, numbers: updatedNumbers });
    onResetOperation();
  }

  function handleSubmit(result) {
    if (CORRECT_RESULT === result.value) {
      onCorrect(Number(card.grade));
    }

    resetBoard();
  }

  return (
    <div className="board">
      <Card
        card={ card }
        onCardReset={ resetBoard }
        onNumberClick={ handleNumberClick }
      />
      <Calculator
        card={ card }
        isReady={ isReady }
        operation={ operation }
        onSubmit={ handleSubmit }
        onClear={ handleCalculatorClear }
        onNumberClick={ handleNumberClick }
        onOperatorClick={ addOperatorToOperation }
        onParenthesisClick={ addParenthesisToOperation }
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
