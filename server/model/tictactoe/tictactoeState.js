/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

var _ = require('lodash');

module.exports = function(history){
  var fullGame = false;
  var validMove = true;
  var board = [[], [], []];

  _.each(history, function(event){
    if(event.event === "JoinGame"){
      fullGame = true;
    }
    if(event.event === "MoveMade") {
      actualMove(event.move);
    }
  });

  var checkWin = function(move){

    for(var i = 0; i < 3; i++) {
      if(!isOccupiedWith(move.coordinates[0], i, move.type)) {
        break;
      }
      if(i === 2) {
        return true;
      }
    }

    for(var j = 0; j < 3; j++) {
      if(!isOccupiedWith(j, move.coordinates[1], move.type)) {
        break;
      }

      if(j === 2) {
        return true;
      }
    }

    if(move.coordinates[0] === move.coordinates[1]) {
      for(var k = 0; k < 3; k++) {
        if(board[k][k] !== move.type){
          break;
        }
        if(k === 2) {
          return true;
        }
      }
    }

    for(var m = 0; m < 3; m++) {
      if(board[m][(3-1)-m] !== move.type){
        break;
      }
      if(m === 2) {
        return true;
      }
    }
    return false;
  };

  var isOccupiedWith = function(X,Y,type){
    return board[X][Y] === type;
  };

  function actualMove(move) {
    board[move.coordinates[0]][move.coordinates[1]] = move.type;
  };

  return {
    fullGame : function(){
      return fullGame;
    },
    makeMove : function(move) {
      actualMove(move);
      return board;
    },
    typeAt : function(X, Y) {
      console.log("X", X);
      console.log("Y", Y);
      return board[X][Y];
  }
  }
};
