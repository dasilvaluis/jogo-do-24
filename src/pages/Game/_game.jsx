/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import { Board } from '../../components/Board';
import { DifficultySetter } from '../../components/DifficultySetter';
import './game.scss';
import '../../styles/helpers.scss';

export const Game = () => (
  <div className="game-container">
    <div className="h-marginbottom-small">
      Difficulty: <DifficultySetter />
    </div>
    <Board />
    <small className="h-display-block h-margintop-small">For the print version of all cards click <Link to="/print">here</Link></small>
  </div>
);
