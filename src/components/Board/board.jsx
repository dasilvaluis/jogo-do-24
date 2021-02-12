import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from '../Card';
import { Calculator } from '../Calculator';
import {
  CardActions,
  CalculationActions,
  NumbersActions,
} from '../../state/actions';
import {
  isSymbolPossible,
  isParenthesisOpen,
  getRandomCard,
} from '../../utils';
import { LOCAL_STORAGE_DIFFICULTY } from '../../constants';
import './board.scss';

const ProtoBoard = ({
  card,
  usedNumbers,
  operation,
  difficulty,
  onSetCard,
  onAddNumber,
  onAddSymbol,
  onSetReady,
  onResetOperation,
}) => {
  const CORRECT_RESULT = 24;
  const MAXIMUM_NUMBERS = 4;

  useEffect(() => {
    const storedDifficulty = localStorage.getItem(LOCAL_STORAGE_DIFFICULTY);
    const targetDifficulty = storedDifficulty ? parseInt(storedDifficulty, 10) : difficulty;

    onSetCard(getRandomCard(targetDifficulty));
  }, []);

  /**
   * Gets random card from endpoint
   *
   * @returns {void}
   */
  const loadRandomCard = () => {
    onSetCard(getRandomCard(difficulty));
  };

  /**
   * Number click handler
   *
   * @param {number} number Clicked number
   * @param {number} numberIndex  Index of clicked number
   * @returns {void}
   */
  const handleNumberClick = (number, numberIndex) => {
    // Return if to many numbers or symbol not possible
    if (MAXIMUM_NUMBERS <= usedNumbers.length || !isSymbolPossible(number, operation)) {
      return;
    }

    onAddNumber(number);
    onAddSymbol(number);
    onSetReady(MAXIMUM_NUMBERS <= usedNumbers.length + 1 && !isParenthesisOpen(operation));

    const updatedNumbers = [ ...card.numbers ];
    updatedNumbers[numberIndex].active = false;

    onSetCard({ ...card, numbers: updatedNumbers });
  };

  /**
   * Registers operator in the current operation
   *
   * @param {string} operator Operator string [+-/*()]
   * @returns {bool} Successful
   */
  const handleOperatorClick = (operator) => {
    // Return if used all numbers
    if (MAXIMUM_NUMBERS <= usedNumbers.length && !(operator === '(' || operator === ')')) {
      return;
    }

    // Push operator
    if (!isSymbolPossible(operator, operation)) {
      return;
    }

    onAddSymbol(operator);
    onSetReady(MAXIMUM_NUMBERS <= usedNumbers.length && !isParenthesisOpen(operation));
  };

  const reset = () => {
    loadRandomCard();
    onResetOperation();
  };

  /**
   * Handle Calculator reset
   *
   * @returns {void}
   */
  const handleCalculatorReset = () => {
    const updatedNumbers = card.numbers.map((el) => ({ ...el, active: true }));

    onSetCard({ ...card, numbers: updatedNumbers });
  };

  /**
   *
   * @param {objec} result Object containing result value and result calculation
   * @returns {void}
   */
  const handleFinish = (result) => {
    if (CORRECT_RESULT === result.value) {
      alert('Great! Your result is 24!');
    } else {
      alert(`Wrong, ${ result.solution } is not equal to 24! Go back to school!`);
    }

    reset();
  };

  return (
    <div className="board">
      <div>
        <Card
          card={ card }
          onCardReset={ reset }
          onNumberClick={ handleNumberClick }
        />
      </div>
      <div>
        <Calculator
          card={ card }
          onReset={ handleCalculatorReset }
          onFinish={ handleFinish }
          onOperatorClick={ handleOperatorClick }
          onNumberClick={ handleNumberClick }
        />
      </div>
    </div>
  );
};

ProtoBoard.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
  usedNumbers: PropTypes.instanceOf(Array).isRequired,
  operation: PropTypes.instanceOf(Array).isRequired,
  difficulty: PropTypes.number.isRequired,
  onSetCard: PropTypes.func.isRequired,
  onAddSymbol: PropTypes.func.isRequired,
  onAddNumber: PropTypes.func.isRequired,
  onSetReady: PropTypes.func.isRequired,
  onResetOperation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  card: state.card,
  usedNumbers: state.usedNumbers,
  operation: state.operation,
  difficulty: state.difficulty,
});

const mapDispatchToProps = {
  onSetCard: CardActions.setCard,
  onAddSymbol: CalculationActions.addSymbol,
  onAddNumber: NumbersActions.addNumber,
  onSetReady: CalculationActions.setReady,
  onResetOperation: CalculationActions.resetOperation,
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(ProtoBoard);
