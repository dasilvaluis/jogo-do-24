/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Board from './components/Board';
import configureStore from './configureStore';

class App extends Component {
  render() {
    const store = configureStore();

    return (
      <Provider store={store}>
        <div className="app-container">
          <header className="app-header">
            <h1 className="app-title">
              Jogo do 24 / 24 Game <small>(beta-2)</small>
            </h1>
            <p>
              The 24 Game is an arithmetical card game in which the objective is to
              find a way to manipulate four integers so that the end result is 24.
              For example, for the card with the numbers 6, 3, 7, 1, a possible
              solution is 6*3+7-1=24.
              <br />
              Read more @ <a href="https://en.wikipedia.org/wiki/24_Game" target="_blank" rel="noopener noreferrer">Wikipedia</a>
            </p>
            <p>
              <small>
                <b>Rules:</b>
                <br />
                - All numbers must be used in the calculation
                <br />
                - Final result should equal to 24
                <br />
                - You may use any math operation available in the calculator
              </small>
            </p>
            <p>
              <small>
                <b>Instructions:</b>
                <br />
                - Click on each number and signs in the correct order, filling the
                blanks bellow the card.
                <br />
                - When all blanks are filled submit your try and see the result!
                <br />
                - The square in the card works as reset, and it will clear the numbers
                and load a new card.
              </small>
            </p>
          </header>

          <main className="app-main">
            <Board />
          </main>

          <footer className="app-footer">
            <small>
              Luís Silva, Nov. 2018 | <a href="https://github.com/luism-s/jogo-do-24" target="_blank" rel="noopener noreferrer">Github</a>
            </small>
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
