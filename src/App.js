import React, { Component } from 'react';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
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
            Read more @ <a href="https://en.wikipedia.org/wiki/24_Game" target="_blank" rel="noopener noreferrer">Wikipedia</a></p>
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
    );
  }
}

export default App;
