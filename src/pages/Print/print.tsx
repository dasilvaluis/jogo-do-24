import { useMemo } from "react";
import { Card } from "../../components/Card";
import { transformCard } from "../../utils";
import { cards } from "../../data/cards.json";
import styles from "./print.module.css";

export function Print() {
  const allCards = useMemo(() => cards.map(transformCard), []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The 24 Game - All Cards</h1>
      <div className={styles.grid}>
        {allCards.map((card, index) => (
          <div key={index} className={styles.gridItem}>
            <Card card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}
