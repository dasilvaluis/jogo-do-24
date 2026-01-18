import type { ReactNode } from "react";
import "./calculator.scss";

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
      className={`calculator__button -${type}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
