/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

module.exports = function(history) {

  var tictactoeState = require('./tictactoeState');
  var gameState = tictactoeState(history);

  return {
    execudeCommand: function (command) {
      var commandHandler = {
        "CreateGame": function (command) {
          return [{
            event: "GameCreated",
            user: command.user,
            name: command.name,
            timeStamp: command.timeStamp
          }]
        },
        "JoinGame": function (command) {
          if (gameState.gameFull()) {
            console.log("Sorry the game is full!");
            return [{
              event: "FullGameJoinAttempted",
              user: command.user,
              name: command.name,
              timeStamp: command.timeStamp
            }];
          }
          console.log("Game joined");
          gameFull = true;
          return [{
            event: "GameJoined",
            user: command.user,
            name: command.name,
            timeStamp: command.timeStamp
          }];
        }
      }
      return commandHandler[command.command](command);
    }
  }
};
