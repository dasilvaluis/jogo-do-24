import React, { Component } from 'react';
import Board from './components/Board';
import './styles/css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="app-container">
        <Board />
      </div>
    );
  }
}

export default App;
