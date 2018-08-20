pragma solidity ^0.4.20;

contract Casino {
  address public owner;
  uint public minimumBet;
  uint public totalBet;
  uint public numberOfBets;
  uint public maxAmountOfBets = 100;
  address[] public players;

  struct Player {
    uint amountBet;
    uint numberSelected;
  }

  mapping(address => Player) public playerInfo;

  constructor(uint _minimumBet) public {
    owner = msg.sender;
    if(_minimumBet != 0) minimumBet = _minimumBet;
  }

  function kill() public {
    if(msg.sender == owner) selfdestruct(owner);
  }

  function checkPlayerExists(address player) public constant returns(bool) {
    for(uint i = 0; i < players.length; i++) {
      if(players[i] == player) return true;
    }
    return false;
  }

  function bet(uint numberSelected) public payable {
    require(!checkPlayerExists(msg.sender));
    require(numberSelected >= 1 && numberSelected <= 10);
    require(msg.value >= minimumBet);

    playerInfo[msg.sender].amountBet = msg.value;
    playerInfo[msg.sender].numberSelected = numberSelected;
    numberOfBets++;
    players.push(msg.sender);
    totalBet += msg.value;
  }

  function generateNumberWinner() public {
    uint numberGenerated = block.number % 10 + 1;
    distributePrizes(numberGenerated);
  }

  function distributePrizes(uint numberWinner) public {
    address[100] memory winners;
    uint count = 0;

    for(uint i = 0; i < players.length; i++){
      address playerAddress = players[i];
      if(playerInfo[playerAddress].numberSelected == numberWinner) {
        winners[count] = playerAddress;
        count++;
      }
      delete playerInfo[playerAddress];
    }
    players.length = 0;

    uint winnerEtherAmount = totalBet / winners.length;

    for(uint j = 0; j < count; j++) {
      if(winners[j] != address(0)) {
        winners[j].transfer(winnerEtherAmount);
      }
    }
    resetData();
  }

  function resetData() private {
    players.length = 0;
    totalBet = 0;
    numberOfBets = 0;
  }

  function() public payable {}
}
