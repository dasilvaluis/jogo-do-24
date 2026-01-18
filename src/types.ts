export type CardNumber = { value: number; active: boolean; uuid: string };

export type DBCard = { numbers: number[]; grade: number };

export type GameCard = { numbers: CardNumber[]; grade: number };

export type Operator = "+" | "-" | "/" | "*";
export type Parenthesis = "(" | ")";
export type OperationSymbol = number | Operator | Parenthesis;

export type RootState = {
  card: GameCard;
  operation: OperationSymbol[];
  difficulty: number;
  score: number;
};

export type SubmitResult = { solution: string; value: number };

export type Message = { type: "error" | "success"; message: string };
