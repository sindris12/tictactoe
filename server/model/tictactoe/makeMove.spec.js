/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

var should = require('should');
var _ = require('lodash');
var tictactoe = require('./tictactoe');

// X = X coord
// Y = Y coord
// T = TYPE (X or O)
// U = User that is making the move
var generateMove = function(x,y,t,u) {
  return {
    command: "MakeMove",
    user: {
      userName: u
    },
    name: "EliteTicTacToe",
    timeStamp: "2014-12-02T11:30:55",
    move: {
      coordinates: [x,y],
      type: t
    }
  };
};

var createGame = function() {
  return {
    event: "GameCreated",
    user: {
      userName: "Sindri"
    },
    name: "EliteTicTacToe",
    timeStamp: "2014-12-02T11:29:29"
  };
};

var joinGame = function() {
  return {
    event: "JoinGame",
    user: {
      userName: "Arni"
    },
    name: "EliteTicTacToe",
    timeStamp: "2014-12-02T11:29:59"
  };
};

describe('Playing a game', function() {

  //This test is just checking if we can make a move and get a event back.

  it('should make a move', function() {

    var given = [
      createGame(),
      joinGame()
    ];

    var when = generateMove(1,2,"X", "Sindri");


    var then = [{
      event: "MoveMade",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:55",
      move: {
        coordinates: [1,2],
        type: "X"
      }
    }];

    var actualEvent = tictactoe(given).execudeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should get a illegal move event', function() {
    var given = [
      createGame(),
      joinGame(),
      {
        event: "MoveMade",
        user: {
          userName: "Sindri"
        },
        name: "EliteTicTacToe",
        timeStamp: "2014-12-02T11:30:55",
        move: {
          coordinates: [1,2],
          type: "X"
        }
      }
    ];

    when = generateMove(1,2, "O", "Arni");

    var then = [{
      event: "IllegalMove",
      user: {
        userName: "Arni"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:55",
      move: {
        coordinates: [1,2],
        type: "O"
      }
    }];

    var actualEvent = tictactoe(given).execudeCommand(when);

    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

});
