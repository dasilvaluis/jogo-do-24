/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import Board from '../../components/Board';
import Difficulty from '../../components/Difficulty/Difficulty';
import './game.css';
import '../../styles/css/helpers.css';

export default () => (
  <div className="game-container">
    <div className="h-marginbottom-small">
      Difficulty: <Difficulty />
    </div>
    <Board />
    <small className="h-display-block h-margintop-small">For the print version of all cards click <Link to="/print">here</Link></small>
  </div>
);
