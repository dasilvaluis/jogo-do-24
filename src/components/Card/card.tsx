import CardBackground from "../../images/card-background.png";
import type { GameCard } from "../../types";
import "./card.scss";

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
    <div className="card">
      <img src={CardBackground} className="card__background" alt="background" />
      <div className="card__grade">
        {Array(card.grade)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="card__grade-point" />
          ))}
      </div>
      {onCardReset && (
        <button
          className="card__submit-button"
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
            className="card__number"
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
