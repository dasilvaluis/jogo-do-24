import { useEffect, useState, useCallback } from "react";
import { Card } from "../Card";
import { Calculator } from "../Calculator";
import { useGameStore } from "../../state/store";
import {
  isNumeric,
  isOperator,
  getRandomCard,
  isOpenParenthesis,
  isCloseParenthesis,
} from "../../utils";
import { CORRECT_RESULT, MAXIMUM_NUMBERS } from "../../constants";
import { isParenthesisOpen } from "../../utils";
import type { SubmitResult, Message, Parenthesis } from "../../types";
import styles from "./board.module.css";

export function Board() {
  const {
    card,
    operation,
    difficulty,
    setCard,
    addSymbol,
    removeLastSymbol,
    resetOperation,
    addPoint,
  } = useGameStore();

  const [lastSymbol] = operation.slice(-1);
  const [message, setMessage] = useState<Message | null>(null);
  const usedNumbers = operation.filter(isNumeric);
  const isReady =
    MAXIMUM_NUMBERS <= usedNumbers.length && !isParenthesisOpen(operation);

  const resetBoard = useCallback(() => {
    const newRandomCard = getRandomCard(difficulty);
    setCard(newRandomCard);
    resetOperation();
    setMessage(null);
  }, [difficulty, setCard, resetOperation]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetBoard();
  }, [resetBoard]);

  function handleNumberClick(number: number, numberIndex: number) {
    const isNumberAllowed =
      typeof lastSymbol === "undefined" ||
      isOperator(lastSymbol) ||
      isOpenParenthesis(lastSymbol);

    if (isNumberAllowed) {
      setMessage(null);
      addSymbol(number);
      const updatedNumbers = [...card.numbers];
      updatedNumbers[numberIndex].active = false;
      setCard({ ...card, numbers: updatedNumbers });
    }
  }

  function addOperatorToOperation(operator: string) {
    const isOperatorAllowed =
      MAXIMUM_NUMBERS > usedNumbers.length &&
      (isNumeric(lastSymbol) || isCloseParenthesis(lastSymbol));

    if (isOperatorAllowed) {
      setMessage(null);
      addSymbol(operator as typeof lastSymbol);
    }
  }

  function addParenthesisToOperation(paren: Parenthesis) {
    setMessage(null);
    addSymbol(paren);
  }

  function handleCalculatorClear() {
    const updatedNumbers = card.numbers.map((el) => ({ ...el, active: true }));
    setCard({ ...card, numbers: updatedNumbers });
    resetOperation();
    setMessage(null);
  }

  function handleBackspace() {
    if (!operation.length) return;
    const lastItem = operation[operation.length - 1];
    if (isNumeric(lastItem)) {
      const index = card.numbers.findIndex(
        (n) => !n.active && n.value === lastItem,
      );
      if (index !== -1) {
        const updatedNumbers = [...card.numbers];
        updatedNumbers[index].active = true;
        setCard({ ...card, numbers: updatedNumbers });
      }
    }
    removeLastSymbol();
    setMessage(null);
  }

  function handleSubmit(result: SubmitResult) {
    if (CORRECT_RESULT === result.value) {
      addPoint(Number(card.grade));
      setMessage({ type: "success", message: "Correct! 🎉" });
      setTimeout(resetBoard, 1500);
    } else {
      setMessage({
        type: "error",
        message: `${result.solution} = ${result.value}, not 24!`,
      });
    }
  }

  return (
    <div className={styles.board}>
      <Card
        card={card}
        onCardReset={resetBoard}
        onNumberClick={handleNumberClick}
      />
      <Calculator
        card={card}
        isReady={isReady}
        operation={operation}
        message={message}
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
