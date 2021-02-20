import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import store from './state/store';
import { Game } from './pages/Game';
import { Print } from './pages/Print';

export const App = () => (
  <Provider store={ store }>
    <div className="app-container">
      <Router>
        <Switch>
          <Route strict path="/">
            <Game />
          </Route>
          <Route strict path="/print">
            <Print />
          </Route>
        </Switch>
      </Router>
      <footer className="app-footer">
        <small>
          Luís Silva, Feb. 2021 | &nbsp;
          <a href="https://github.com/luism-s/jogo-do-24" target="_blank" rel="noopener noreferrer">Github</a>
        </small>
      </footer>
    </div>
  </Provider>
);
