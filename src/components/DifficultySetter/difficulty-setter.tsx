import { useEffect, ChangeEvent, useCallback } from "react";
import { useGameStore } from "../../state/store";
import { getStoredDifficulty, setStoredDifficulty } from "../../utils";

export function DifficultySetter() {
  const { difficulty, setDifficulty } = useGameStore();

  const initDifficulty = useCallback(() => {
    const storedDifficulty = getStoredDifficulty();
    if (storedDifficulty) {
      setDifficulty(storedDifficulty);
    }
  }, [setDifficulty]);

  useEffect(() => {
    initDifficulty();
  }, [initDifficulty]);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const newDifficulty = parseInt(e.target.value, 10);
    setStoredDifficulty(newDifficulty);
    setDifficulty(newDifficulty);
  }

  return (
    <select
      name="difficulty-selection"
      value={difficulty}
      onChange={handleChange}
    >
      <option value="0">All</option>
      <option value="1">Easy</option>
      <option value="2">Medium</option>
      <option value="3">Hard</option>
    </select>
  );
}
