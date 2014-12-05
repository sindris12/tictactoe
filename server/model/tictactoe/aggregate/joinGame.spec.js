/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

var should = require('should');
var _ = require('lodash');
var tictactoe = require('./tictactoe');

describe('Joining a game', function() {

  it('should join a created game', function() {

    var given = [{
      id: "18",
      event: "GameCreated",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var when = {
      id: "18",
      command: "JoinGame",
      user: {
        userName: "Arni"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:59"
    };

    var then = [{
      id: "18",
      event: "GameJoined",
      user: {
        userName: "Arni"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:59"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(actualEvent).eql(then);
  });

  it('should try to join a full game', function() {

    var given = [
      {
        id: "18",
        event: "GameCreated",
        user: {
          userName: "Sindri"
        },
        name: "EliteTicTacToe",
        timeStamp: "2014-12-02T11:29:29"
      },
      {
        id: "18",
        event: "JoinGame",
        user: {
          userName: "Arni"
        },
        name: "EliteTicTacToe",
        timeStamp: "2014-12-02T11:29:59"
      }
    ];

    var when = {
      id: "18",
      command: "JoinGame",
      user: {
        userName: "Doddi"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:07"
    };

    var then = [{
      id: "18",
      event: "FullGameJoinAttempted",
      user: {
        userName: "Doddi"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:07"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(actualEvent).eql(then);
  });
});
