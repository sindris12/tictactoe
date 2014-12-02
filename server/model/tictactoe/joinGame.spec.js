/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

var should = require('should');
var _ = require('lodash');
var tictactoe = require('./tictactoe');

describe('Joining a game', function() {

  it('should join a created game', function() {

    var given = [{
      event: "GameCreated",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var when = {
      command: "JoinGame",
      user: {
        userName: "Arni"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:59"
    };

    var then = [{
      event: "GameJoined",
      user: {
        userName: "Arni"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:59"
    }];

    var actualEvent = tictactoe(given).execudeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));

    //should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));

    //LOL

  });

});
