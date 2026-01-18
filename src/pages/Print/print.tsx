import { cards as cardsList } from "../../data/cards.json";
import { Card } from "../../components/Card";
import { transformCard } from "../../utils";
import type { DBCard } from "../../types";
import "../../styles/helpers.scss";
import "./print.scss";

export const Print = () => {
  const cardsGrouping = (cardsList as DBCard[]).reduce<DBCard[][]>(
    (acc, curr) => {
      const group = [...acc];
      const cardsPerGroup = 6;

      if (
        group.length === 0 ||
        group[group.length - 1].length >= cardsPerGroup
      ) {
        return [...group, [curr]];
      }

      group[group.length - 1].push(curr);
      return group;
    },
    [],
  );

  return (
    <div className="print-container">
      {cardsGrouping.map((cards, groupIndex) => (
        <div className="print-container__cards" key={groupIndex}>
          {cards.map((card) => (
            <Card key={card.numbers.join("")} card={transformCard(card)} />
          ))}
        </div>
      ))}
    </div>
  );
};
