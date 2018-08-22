import React, { Component } from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import "./../css/index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWinner: 0,
      numberOfBets: 0,
      miminumBet: 0,
      totalBet: 0,
      maxAmountOfBets: 0
    };

    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source like Metamask");
      this.web3 = new Web3(web3.currentProvider);
    } else {
      console.log("No web detected. Falling back to http://localhost:8545");
      this.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
      );
    }

    this.listItem = this.listItem.bind(this);
    this.voteNumber = this.voteNumber.bind(this);
    this.getAbi = this.getAbi.bind(this);
  }

  getAbi() {
    ajax("/abi").then(res => {
      const MyContract = web3.eth.contract(res.json);
      MyContract.at("0x6ec067ddee18b0b9b73a515344e85a3cfbbe204a");
      this.casino = MyContract;
    });
  }

  listItem(i) {
    return (
      <li
        key={`li${i}`}
        onClick={() => {
          this.voteNumber(i);
        }}
      >
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

ReactDOM.render(<App />, document.querySelector("#root"));
