/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

angular.module('tictactoeApp')
  .controller('TicTacToeCtrl', function ($scope, $http, $state, TicService) {

    function random() {
      return Math.floor((Math.random() * 1000) + 1);
    }

    $scope.myid = random();


    $scope.processEvents = function(events){
      angular.forEach(events, function(event) {
        console.log(event);
        if(event.event === 'GameCreated' || event.event === 'GameJoined') {
          $state.go('play', {'id': event.id});
        }
      });
    };

    $scope.newGame = function(){
      if($scope.userName && $scope.gameName) {
        var postPromise = $http.post('/api/createGame/',{
            'id': $scope.myid,
            'command':'CreateGame',
            'user':{'userName':$scope.userName},
            'name':$scope.gameName,
            'timeStamp':'2014-12-02T11:29:29',
            'symbol': 'X'}
        );
        postPromise.then(function(data){
          TicService.setUserName($scope.userName);
          TicService.setGameName($scope.gameName);
          TicService.setCreated($scope.userName);
          TicService.setType('X');
          $scope.processEvents(data.data);
        });
      }
    };
  });
