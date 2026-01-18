import CardBackground from "../../images/card-background.png";
import type { GameCard } from "../../types";
import styles from "./card.module.css";

type CardProps = {
  card: GameCard;
  onCardReset?: () => void;
  onNumberClick?: (value: number, index: number) => void;
};

export function Card({ card, onCardReset, onNumberClick }: CardProps) {
  if (!card.numbers.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.card}>
      <img
        src={CardBackground}
        className={styles.background}
        alt="background"
      />
      <div className={styles.grade}>
        {Array(card.grade)
          .fill(0)
          .map((_, i) => (
            <span key={i} className={styles.gradePoint} />
          ))}
      </div>
      {onCardReset && (
        <button
          className={styles.submitButton}
          type="submit"
          tabIndex={0}
          aria-label="Reset"
          onClick={onCardReset}
        />
      )}
      <div>
        {card.numbers.map((number, index) => (
          <button
            type="button"
            className={styles.number}
            disabled={!number.active}
            onClick={() => onNumberClick?.(number.value, index)}
            key={`card--${number.value}--${number.uuid}`}
          >
            {number.value}
          </button>
        ))}
      </div>
    </div>
  );
}
