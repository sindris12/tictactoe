/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

module.exports = function(history) {

  var tictactoeState = require('./tictactoeState');
  var gameState = tictactoeState(history);
  var boardSize = 2;

  return {
    execudeCommand: function (command) {
      console.log(command);
      var commandHandler = {
        "CreateGame": function (command) {
          if(!command.name) {
            return [{
              event: "NoGameName",
              user: command.user,
              name: command.name,
              timeStamp: command.timeStamp
            }];
          }
          if(!command.user.userName) {
            return [{
              event: "NoUserName",
              user: command.user,
              name: command.name,
              timeStamp: command.timeStamp
            }];
          }
          return [{
            event: "GameCreated",
            user: command.user,
            name: command.name,
            timeStamp: command.timeStamp
          }]
        },
        "JoinGame": function (command) {
          if (gameState.fullGame()) {
            console.log("Sorry the game is full!");
            return [{
              event: "FullGameJoinAttempted",
              user: command.user,
              name: command.name,
              timeStamp: command.timeStamp
            }];
          }
          console.log("Game joined");
          return [{
            event: "GameJoined",
            user: command.user,
            name: command.name,
            timeStamp: command.timeStamp
          }];
        },
        "MakeMove": function(command) {
          if(gameState.fullGame()) {
            //2 users are in the game and the game can start.

            console.log(command);
            console.log("typeAT", gameState.typeAt(command.move.coordinates[0], command.move.coordinates[1]));

            var check = gameState.typeAt(command.move.coordinates[0], command.move.coordinates[1]);

            if(check) {
              console.log("RIGHT PLACE");
              return [{
                event: "IllegalMove",
                user: command.user,
                name: command.name,
                timeStamp: command.timeStamp,
                move: command.move
              }];
            }
            //still to add a check if the move is valid and if this is actually this players turn to make a move.



            gameState.makeMove(command.move);
            return [{
              event: "MoveMade",
              user: command.user,
              name: command.name,
              timeStamp: command.timeStamp,
              move: command.move
            }];
          }
        }
      }
      return commandHandler[command.command](command);
    }
  }
};
