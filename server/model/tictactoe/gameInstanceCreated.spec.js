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
      command: "CreateGame",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:29"
    }

    var then = [{
      event: "GameCreated",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvent = tictactoe(given).execudeCommand(when);

    should(actualEvent.length).be.exactly(1);

    should(actualEvent).eql(then);
  })

  it('should create a game instance without a game name and get a error event', function() {

    var given = [];

    var when = {
      command: "CreateGame",
      user: {
        userName: "Sindri"
      },
      name: "",
      timeStamp: "2014-12-02T11:29:29"
    };

    var then = [{
      event: "NoGameName",
      user: {
        userName: "Sindri"
      },
      name: "",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvent = tictactoe(given).execudeCommand(when);

    should(actualEvent).eql(then);
  });

  it('should create a game instance without a userName and get a error event', function() {

    var given = [];

    var when = {
      command: "CreateGame",
      user: {
        userName: ""
      },
      name: "Elite",
      timeStamp: "2014-12-02T11:29:29"
    };

    var then = [{
      event: "NoUserName",
      user: {
        userName: ""
      },
      name: "Elite",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvent = tictactoe(given).execudeCommand(when);

    should(actualEvent).eql(then);

  });
});

