import { create } from "zustand";
import type { GameCard, OperationSymbol } from "../types";

type GameState = {
  card: GameCard;
  operation: OperationSymbol[];
  difficulty: number;
  score: number;
  setCard: (card: GameCard) => void;
  addSymbol: (symbol: OperationSymbol) => void;
  removeLastSymbol: () => void;
  resetOperation: () => void;
  setDifficulty: (difficulty: number) => void;
  addPoint: (quantity?: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  card: { grade: 0, numbers: [] },
  operation: [],
  difficulty: -1,
  score: 0,
  setCard: (card) => set({ card }),
  addSymbol: (symbol) =>
    set((state) => ({ operation: [...state.operation, symbol] })),
  removeLastSymbol: () =>
    set((state) => ({ operation: state.operation.slice(0, -1) })),
  resetOperation: () => set({ operation: [] }),
  setDifficulty: (difficulty) => set({ difficulty }),
  addPoint: (quantity = 1) =>
    set((state) => ({ score: state.score + quantity })),
}));
