import type { Operator, Parenthesis } from "./types";

export const LOCAL_STORAGE_DIFFICULTY = "24game_difficulty";

export const OPERATORS: Record<string, Operator> = {
  PLUS: "+",
  MINUS: "-",
  DIVIDE: "/",
  MULTIPLY: "*",
};

export const SYMBOLS = {
  ...OPERATORS,
};

export const PARENTHESIS: Record<string, Parenthesis> = {
  OPEN: "(",
  CLOSE: ")",
};

export const KEYS = {
  ENTER: "Enter",
  ESCAPE: "Escape",
  BACKSPACE: "Backspace",
  EQUALS: "=",
  CLEAR: "c",
} as const;

export const CORRECT_RESULT = 24;

export const MAXIMUM_NUMBERS = 4;
