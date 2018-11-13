import React, { Component } from 'react';
import logo from './images/logo.svg';
import Card from './components/Card';
import './styles/css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="app-container">
        <Card numbers={['8','1','8','4']}/>
      </div>
    );
  }
}

export default App;
