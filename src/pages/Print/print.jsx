import React from 'react';
import { cards as cardsList } from '../../data/cards.json';
import { Card } from '../../components/Card';
import { transfromCard } from '../../utils';
import '../../styles/helpers.scss';
import './print.scss';

export const Print = () => {
  const cardsGrouping = cardsList.reduce((acc, curr) => {
    const group = [ ...acc ];
    const cardsPerGroup = 6;

    if (group.length === 0 || group[group.length - 1].length >= cardsPerGroup) {
      return [ ...group, [ curr ] ];
    }

    group[group.length - 1].push(curr);
    return group;
  }, []);

  return (
    <div className="print-container">
      { cardsGrouping.map((cards) => (
        <div className="print-container__cards" key={ Math.random() * 100 }>
          { cards.map((card) => (
            <Card key={ card.numbers.join('') } card={ transfromCard(card) } />
          )) }
        </div>
      )) }
    </div>
  );
};
