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
    id: "18",
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

var moveEvent = function(x,y,t,u) {
  return {
    id: "18",
    event: "MoveMade",
      user: {
    userName: u
  },
    name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:55",
    move: {
    coordinates: [x,y],
      type: t
  }
  }
}

var createGame = function() {
  return {
    id: "18",
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
    id: "18",
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
      id: "18",
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

    var actualEvent = tictactoe(given).executeCommand(when);
    should(actualEvent).eql(then);
  });

  it('should get a illegal move event', function() {
    var given = [
      createGame(),
      joinGame(),
      {
        id: "18",
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

    var when = generateMove(1,2, "O", "Arni");

    var then = [{
      id: "18",
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

    var actualEvent = tictactoe(given).executeCommand(when);

    should(actualEvent).eql(then);
  });

  it('should play a simple game that ends with a win', function() {

    var given = [
      createGame(),
      joinGame(),
      moveEvent(0,0,"X", "Sindri"),
      moveEvent(0,1,"O", "Arni"),
      moveEvent(1,0,"X", "Sindri"),
      moveEvent(1,1,"O", "Arni"),
    ];

    var when = generateMove(2,0, "X", "Sindri");
    //GameWon
    var then = [{
      id: "18",
      event: "GameWon",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:55",
      move: {
        coordinates: [2,0],
        type: "X"
      }
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(actualEvent).eql(then);

  });

  it('should return a NotYourTurn event when a player tries to make two moves in a row', function() {

    var given = [
      createGame(),
      joinGame(),
      moveEvent(0,0,"X", "Sindri")
    ];

    var when = generateMove(0,1, "X", "Sindri");

    var then = [{
      id: "18",
      event: "NotYourTurn",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:55",
      move: {
        coordinates: [0,1],
        type: "X"
      }
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(actualEvent).eql(then);
  });

  it('should get a out of bounds event when someone tries to add a number that is not in the grid', function() {

    var given = [
      createGame(),
      joinGame(),
      moveEvent(0,0,"X", "Sindri")
    ];

    var when = generateMove(3,3, "O", "Arni");

    var then = [{
      id: "18",
      event: "OutOfBounds",
      user: {
        userName: "Arni"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:55",
      move: {
        coordinates: [3,3],
        type: "O"
      }
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(actualEvent).eql(then);

  });

  it('should play a game and it ends with a draw', function() {

    var given = [
      createGame(),
      joinGame(),
      moveEvent(0,0, "X", "Sindri"),
      moveEvent(0,1, "O", "Arni"),
      moveEvent(0,2, "X", "Sindri"),
      moveEvent(1,2, "O", "Arni"),
      moveEvent(1,0, "X", "Sindri"),
      moveEvent(2,0, "O", "Arni"),
      moveEvent(1,1, "X", "Sindri"),
      moveEvent(2,2, "O", "Arni")
    ];

    var when = generateMove(2,1,"X", "Sindri");

    var then = [{
      id: "18",
      event: "GameDrawn",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:55",
      move: {
        coordinates: [2,1],
        type: "X"
      }
    }]

    var actualEvent = tictactoe(given).executeCommand(when);

    should(actualEvent).eql(then);
  });
});
