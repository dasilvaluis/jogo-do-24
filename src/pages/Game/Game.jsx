/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Board from '../../components/Board';
import Difficulty from '../../components/Difficulty/Difficulty';
import './game.css';


export default () => (
  <div className="game-container">
    <div className="h-marginbottom-small">
      Difficulty: <Difficulty />
    </div>
    <Board />
  </div>
);
