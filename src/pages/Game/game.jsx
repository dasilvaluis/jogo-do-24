import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Board } from '../../components/Board';
import { DifficultySetter } from '../../components/DifficultySetter';
import './game.scss';
import '../../styles/helpers.scss';

const ProtoGame = ({ score }) => (
  <div className="game-container">
    <div className="app-header__wrapper">
      <header className="app-header">
        <h1 className="app-header__title">
          The 24 Game
        </h1>
        <span className="app-header__sub-title">
          Combine these numbers in order to equal&nbsp;
          <b>24</b>
          !
        </span>
      </header>
      <div className="app-header__tools">
        <div>{ `Score: ${ score }` }</div>
        <div className="app-header__settings">
          Difficulty:&nbsp;
          <DifficultySetter />
        </div>
      </div>
    </div>
    <Board />
    <div className="h-margintop-sm">
      <p>
        <b>The 24 Game</b>
        &nbsp;is an arithmetical card game in which the objective is to
        find a way to manipulate four integers so that the end result is 24.
        e.g. for a card with the numbers 6, 3, 7, 1 a possible solution is 6 * 3 + 7 - 1 = 24.
        <br />
        Read more @&nbsp;
        <a href="https://en.wikipedia.org/wiki/24_Game" target="_blank" rel="noopener noreferrer">Wikipedia</a>
      </p>
      <p>
        <b>Rules:</b>
        <br />
        - All numbers in the card must be used, without repeating them
        <br />
        - You may use any simple math operation (+, -, *, /)
        <br />
        - Final result must equal to 24
      </p>
      <p>
        <b>FAQ:</b>
        <br />
        - What are dots on the top right corner?
        <br />
        A: Difficulty. 1 - Easy; 2 - Medium; 3 - Hard.
        <br />
        - How do I skip the card?
        <br />
        A: Click on the red square in the center of the card.
        <br />
        - Why is the card ugly?
        <br />
        A: It is the original design.
        <br />
        - Can I get a print version of all the cards?
        <br />
        A: Yes,&nbsp;
        <Link to="/print" target="_blank">here</Link>
        .
      </p>
    </div>
  </div>
);

ProtoGame.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.score,
});

export const Game = connect(mapStateToProps)(ProtoGame);
