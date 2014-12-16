/**
 * Created by sindrisigurjonsson on 08/12/14.
 */

'use strict';

angular.module('tictactoeApp')
  .controller('TicTacToePlayCtrl', function ($scope, $http, TicService, $stateParams, $interval) {

    $scope.headerText = 'Waiting for player to join the game';
    $scope.userName = TicService.getUserName();
    $scope.created = TicService.getCreated();
    $scope.myType = TicService.getType();
    $scope.theid = $stateParams.id;
    $scope.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];

    $scope.refreshEvents = function() {
      var getPromise = $http.get('/api/events/' + $scope.theid);

      getPromise.then(function(data){
        $scope.processEvents(data.data);
        console.log('refresh data: ', data);
      });
    };

    $scope.refreshEvents();

    $scope.processEvents = function(events){

      $scope.history = events;

      angular.forEach(events, function(event) {
        console.log(event);

        if(event.event === 'GameCreated') {
          $scope.gameName = event.name;
        }

        if(event.event === 'GameJoined') {
          $scope.created = $scope.userName;
          $scope.showJoin = true;
          $scope.headerText = 'Enjoy the game';
        }

        if(event.event === 'MoveMade' || event.event === 'GameWon' || event.event === 'GameDrawn') {
          $scope.board[event.move.coordinates[0]][event.move.coordinates[1]] = event.move.type;

          if(event.event === 'GameWon') {
            $scope.gameOver = '' +$scope.userName + ' won the game!';
          }
          else if(event.event === 'GameDrawn') {
            $scope.gameOver = 'Game ended with a draw';
          }
        }
      });
    };

    $scope.makeMove = function (x,y,t) {
        var postPromise = $http.post('/api/placeMove', {
            'id': $scope.theid,
            'command': 'MakeMove',
            'user': {'userName': $scope.userName},
            'name': TicService.getGameName(),
            'timeStamp': '2014-12-02T11:29:29',
            'move': {
              'coordinates': [x,y],
              'type': t
            }}
        );
        postPromise.then(function() {
          $scope.refreshEvents();
        });
      };

    $scope.joinGame = function(userName){

      $scope.userName = userName;
      $scope.myType = 'O';

      if($scope.userName) {
        var post2Promise = $http.post('/api/joinGame/', {
            'id': $scope.theid,
            'command':'JoinGame',
            'user':{'userName':$scope.userName},
            'name':$scope.gameName,
            'timeStamp':'2014-12-02T11:29:29',
            'symbol': 'O'}
        );
        post2Promise.then(function() {
          $scope.refreshEvents();
        });
      }
      else {
        $scope.missingJoin = 'UserName is needed';
      }
    };

    $interval(function() {
      $scope.refreshEvents();
    }, 3000);
  });
