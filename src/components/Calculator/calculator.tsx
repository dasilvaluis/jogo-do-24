import { useCallback, useEffect } from "react";
import { KEYS, OPERATORS, PARENTHESIS } from "../../constants";
import type {
  GameCard,
  Message,
  OperationSymbol,
  Parenthesis as ParenthesisType,
  SubmitResult,
} from "../../types";
import { getParenthesisBalance, isNumeric, isOperator } from "../../utils";
import { CalculatorButton } from "./calculator-button";
import { useButtonsDisabled } from "./calculator-hooks";
import { doCalculation } from "./calculator-utils";
import styles from "./calculator.module.css";

type CalculatorProps = {
  card: GameCard;
  isReady: boolean;
  operation: OperationSymbol[];
  message: Message | null;
  onNumberClick: (num: number, index: number) => void;
  onOperatorClick: (op: string) => void;
  onParenthesisClick: (paren: ParenthesisType) => void;
  onClear: () => void;
  onBackspace: () => void;
  onSubmit: (result: SubmitResult) => void;
};

export function Calculator({
  card,
  isReady,
  operation,
  message,
  onNumberClick,
  onOperatorClick,
  onParenthesisClick,
  onClear,
  onBackspace,
  onSubmit,
}: CalculatorProps) {
  const { operatorsDisabled, openParenDisabled, closeParenDisabled } =
    useButtonsDisabled(operation);
  const [lastSymbol] = operation.slice(-1);

  const submitSolution = useCallback(() => {
    if (!operation.length) return;

    const balance = getParenthesisBalance(operation);
    const finalOperation = [...operation];
    for (let i = 0; i < balance; i++) {
      finalOperation.push(PARENTHESIS.CLOSE);
    }

    onSubmit({
      solution: finalOperation.join(""),
      value: doCalculation(finalOperation),
    });
  }, [operation, onSubmit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        const num = parseInt(key, 10);
        const index = card.numbers.findIndex(
          (n) => n.active && n.value === num,
        );
        if (index !== -1) {
          onNumberClick(num, index);
        }
        return;
      }

      if (isOperator(key)) {
        onOperatorClick(key);
        return;
      }

      if (key === PARENTHESIS.OPEN && !openParenDisabled && !isReady) {
        onParenthesisClick(PARENTHESIS.OPEN);
        return;
      }
      if (key === PARENTHESIS.CLOSE && !closeParenDisabled && !isReady) {
        onParenthesisClick(PARENTHESIS.CLOSE);
        return;
      }

      if ((key === KEYS.ENTER || key === KEYS.EQUALS) && isReady) {
        submitSolution();
        return;
      }

      if (
        (key === KEYS.ESCAPE || key.toLowerCase() === KEYS.CLEAR) &&
        operation.length
      ) {
        onClear();
      }

      if (key === KEYS.BACKSPACE && operation.length) {
        onBackspace();
      }
    },
    [
      card.numbers,
      isReady,
      openParenDisabled,
      closeParenDisabled,
      operation.length,
      onNumberClick,
      onOperatorClick,
      onParenthesisClick,
      onClear,
      onBackspace,
      submitSolution,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.calculator}>
      <input
        className={styles.input}
        type="text"
        value={operation.join(" ")}
        disabled
      />
      <div className={styles.controls}>
        <div className={styles.column}>
          {card.numbers.map((el, index) => (
            <CalculatorButton
              key={`calculator-number--${el.uuid}`}
              disabled={
                !el.active ||
                isNumeric(lastSymbol) ||
                lastSymbol === PARENTHESIS.CLOSE
              }
              onClick={() => onNumberClick(el.value, index)}
            >
              {el.value}
            </CalculatorButton>
          ))}
        </div>
        <div className={styles.column}>
          {Object.values(OPERATORS).map((el) => (
            <CalculatorButton
              key={el}
              disabled={isReady || operatorsDisabled}
              onClick={() => onOperatorClick(el)}
            >
              {el}
            </CalculatorButton>
          ))}
        </div>
        <div className={styles.columnSm}>
          <CalculatorButton
            disabled={isReady || openParenDisabled}
            onClick={() => onParenthesisClick(PARENTHESIS.OPEN)}
          >
            {PARENTHESIS.OPEN}
          </CalculatorButton>
          <CalculatorButton
            disabled={isReady || closeParenDisabled}
            onClick={() => onParenthesisClick(PARENTHESIS.CLOSE)}
          >
            {PARENTHESIS.CLOSE}
          </CalculatorButton>
        </div>
        <div className={styles.columnSm}>
          <CalculatorButton disabled={!operation.length} onClick={onClear}>
            C
          </CalculatorButton>
          <CalculatorButton disabled={!isReady} onClick={submitSolution}>
            {KEYS.EQUALS}
          </CalculatorButton>
        </div>
      </div>
      {message && (
        <div
          className={
            message.type === "error"
              ? styles.messageError
              : styles.messageSuccess
          }
        >
          {message.message}
        </div>
      )}
    </div>
  );
}
