/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

module.exports = function(history) {

  var tictactoeState = require('./tictactoeState');
  var gameState = tictactoeState(history);
  var boardSize = 2;

  return {
    executeCommand: function (command) {
      var commandHandler = {

        //Returns a event when a user tries to create a game, and also checks for possible errors
        "CreateGame": function (command) {

          if(!command.name) {
            return [{
              id: String(command.id),
              event: "NoGameName",
              user: command.user,
              name: command.name,
              timeStamp: command.timeStamp
            }];
          }
          if(!command.user.userName) {
            return [{
              id: String(command.id),
              event: "NoUserName",
              user: command.user,
              name: command.name,
              timeStamp: command.timeStamp
            }];
          }
          return [{
            id: String(command.id),
            event: "GameCreated",
            user: command.user,
            name: command.name,
            timeStamp: command.timeStamp,
            symbol: command.symbol
          }]
        },

        //Returns a join game event or full game error
        "JoinGame": function (command) {
          if (gameState.fullGame()) {
            return [{
              id: String(command.id),
              event: "FullGameJoinAttempted",
              user: command.user,
              name: command.name,
              timeStamp: command.timeStamp
            }];
          }
          return [{
            id: String(command.id),
            event: "GameJoined",
            user: command.user,
            name: command.name,
            timeStamp: command.timeStamp,
            symbol: command.symbol
          }];
        },
        "MakeMove": function(command) {

          if(gameState.fullGame()) {
            //2 users are in the game and the game can start.

            //Check if values that are coming from the user are legal
            if(command.move.coordinates[0] > 2 || command.move.coordinates[1] > 2) {
              return [{
                id: String(command.id),
                event: "OutOfBounds",
                user: command.user,
                name: command.name,
                timeStamp: command.timeStamp,
                move: command.move
              }];
            }

            var check = gameState.typeAt(command.move.coordinates[0], command.move.coordinates[1]);

            //Check if there is symbol already in the box the user picked.
            if(check) {
              return [{
                id: String(command.id),
                event: "IllegalMove",
                user: command.user,
                name: command.name,
                timeStamp: command.timeStamp,
                move: command.move
              }];
            }
            //Check if it's this players turn to make a move
            if(command.move.type === gameState.lastToPlay()) {
              return [{
                id: String(command.id),
                event: "NotYourTurn",
                user: command.user,
                name: command.name,
                timeStamp: command.timeStamp,
                move: command.move
              }];
            }

            //Now we can make the move
            var result = gameState.makeMove(command.move);

            //Check for win
            if(result === "WIN") {
              return [{
                id: String(command.id),
                event: "GameWon",
                user: command.user,
                name: command.name,
                timeStamp: command.timeStamp,
                move: command.move
              }];
            }

            //Check for draw
            if(result === "DRAW") {
              return [{
                id: String(command.id),
                event: "GameDrawn",
                user: command.user,
                name: command.name,
                timeStamp: command.timeStamp,
                move: command.move
              }];
            }

            //if result is false the game is still live
            if(result === false) {
              return [{
                id: String(command.id),
                event: "MoveMade",
                user: command.user,
                name: command.name,
                timeStamp: command.timeStamp,
                move: command.move
              }];
            }
          }
        }
      }
      return commandHandler[command.command](command);
    }
  }
};
