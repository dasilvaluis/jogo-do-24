import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import store from './store';
import { Game } from './pages/Game';
import { Print } from './pages/Print';


export const App = () => (
  <Provider store={store}>
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          24 Game
        </h1>
        <p>
          The 24 Game is an arithmetical card game in which the objective is to
          find a way to manipulate four integers so that the end result is 24.
          e.g. for a card with the numbers 6, 3, 7, 1 a possible solution is 6*3+7-1=24.
          <br />
          Read more @ <a href="https://en.wikipedia.org/wiki/24_Game" target="_blank" rel="noopener noreferrer">Wikipedia</a>
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
      </header>

      <Router>
        <Switch>
          <Route path="/print">
            <Print />
          </Route>
          <Route path="/">
            <Game />
          </Route>
        </Switch>
      </Router>

      <footer className="app-footer">
        <small>
          Luís Silva, Nov. 2018 | <a href="https://github.com/luism-s/jogo-do-24" target="_blank" rel="noopener noreferrer">Github</a>
        </small>
      </footer>
    </div>
  </Provider>
);
