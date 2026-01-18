import type { ReactNode } from "react";
import styles from "./calculator.module.css";

type CalculatorButtonProps = {
  children: ReactNode;
  type?: "square" | "vertical-rect";
  disabled: boolean;
  onClick: () => void;
};

export function CalculatorButton({
  children,
  type = "square",
  disabled,
  onClick,
}: CalculatorButtonProps) {
  return (
    <button
      type="button"
      className={
        type === "vertical-rect" ? styles.buttonVertical : styles.button
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
