/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

var _ = require('lodash');

module.exports = function(history){

  var fullGame = false;
  var moveCount = 0;
  var board = [[], [], []];
  var lastPlayed = 'O';

  _.each(history, function(event){

    if(event.event === "GameJoined"){
      fullGame = true;
    }
    if(event.event === "MoveMade") {
      actualMove(event.move);
      lastPlayed = event.move.type;
    }
  });

    //Function that checks if the game has ended in a win or a draw
    function checkResult(move){

    for(var i = 0; i < 3; i++) {
      if(!isOccupiedWith(move.coordinates[0], i, move.type)) {
        break;
      }
      if(i === 2) {
        return "WIN";
      }
    }

    for(var j = 0; j < 3; j++) {
      if(!isOccupiedWith(j, move.coordinates[1], move.type)) {
        break;
      }

      if(j === 2) {
        return "WIN";
      }
    }

    if(move.coordinates[0] === move.coordinates[1]) {
      for(var k = 0; k < 3; k++) {
        if(board[k][k] !== move.type){
          break;
        }
        if(k === 2) {
          return "WIN";
        }
      }
    }

    for(var m = 0; m < 3; m++) {
      if(board[m][(3-1)-m] !== move.type){
        break;
      }
      if(m === 2) {
        return "WIN";
      }
    }

    if(moveCount === 9) {
      return "DRAW";
    }
    return false;
  }

  //function to check what symbol is in a slot
  function isOccupiedWith(X,Y,type){
    return board[X][Y] === type;
  }

  //the function that adds to the board
  function actualMove(move) {
    board[move.coordinates[0]][move.coordinates[1]] = move.type;
    moveCount++;

    return checkResult(move);
  }

  function firstTo(type) {
    if(moveCount === 0 && type === 'X') {
      return true;
    }
    else {
      return false;
    }
  }

  return {
    fullGame : function(){
      return fullGame;
    },
    makeMove : function(move) {
      return actualMove(move);
    },
    typeAt : function(X, Y) {
      return board[X][Y];
    },
    lastToPlay : function() {
      return lastPlayed;
    },
    firstToPlay : function(type) {
      return firstTo(type);
    }
  }
};
