/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

var should = require('should');
var _ = require('lodash');
var tictactoe = require('./tictactoe');

describe('Create Game', function() {

  it('should create a instance of the game', function() {
    var given = [];

    var when = {
      id: "18",
      command: "CreateGame",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:29",
      symbol: "X"
    }

    var then = [{
      id: "18",
      event: "GameCreated",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:29",
      symbol: "X"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(actualEvent.length).be.exactly(1);

    should(actualEvent).eql(then);
  })

  it('should create a game instance without a game name and get a error event', function() {

    var given = [];

    var when = {
      id: "18",
      command: "CreateGame",
      user: {
        userName: "Sindri"
      },
      name: "",
      timeStamp: "2014-12-02T11:29:29",
      symbol: "X"
    };

    var then = [{
      id: "18",
      event: "NoGameName",
      user: {
        userName: "Sindri"
      },
      name: "",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(actualEvent).eql(then);
  });

  it('should create a game instance without a userName and get a error event', function() {

    var given = [];

    var when = {
      id: "18",
      command: "CreateGame",
      user: {
        userName: ""
      },
      name: "Elite",
      timeStamp: "2014-12-02T11:29:29",
      symbol: "X"
    };

    var then = [{
      id: "18",
      event: "NoUserName",
      user: {
        userName: ""
      },
      name: "Elite",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(actualEvent).eql(then);

  });
});

