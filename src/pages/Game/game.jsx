import React from 'react';
import { Board } from '../../components/Board';
import { DifficultySetter } from '../../components/DifficultySetter';
import './game.scss';
import '../../styles/helpers.scss';
import { About } from '../../components/About';

export const Game = () => (
  <div className="game-container">
    <header className="app-header">
      <h1 className="app-title">
        The 24 Game
      </h1>
    </header>
    <Board />
    <div className="h-margintop-sm">
      Difficulty:&nbsp;
      <DifficultySetter />
    </div>
    <div className="h-margintop-sm">
      <About />
    </div>
  </div>
);
