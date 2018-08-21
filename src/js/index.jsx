import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './../css/index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWinner: 0,
      timer: 0
    };

    this.listItem = this.listItem.bind(this);
    this.voteNumber = this.voteNumber.bind(this);
  }

  listItem(i) {
    return (
      <li
        onClick={() => {
          this.voteNumber(i);
        }}>
        i
      </li>
    );
  }

  voteNumber(number) {
    console.log(number);
  }

  render() {
    return (
      <div className="main-container">
        <h1>Bet for your best number and win huge amounts of Ether</h1>
        <div className="block">
          <h4>Time:</h4>&nbsp;
          <span ref="timer">{this.state.timer}</span>
        </div>
        <div className="block">
          <h4>Last winner:</h4>&nbsp;
          <span ref="last-winner">{this.state.lastWinner}</span>
        </div>
        <hr />
        <h2>Vote for the next number</h2>
        <ul>{Array.from(new Array(10), (v, i) => this.listItem(i + 1))}</ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
