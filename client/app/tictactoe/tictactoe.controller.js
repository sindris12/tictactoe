/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

angular.module('tictactoeApp')
  .controller('TicTacToeCtrl', function ($scope, $http) {

    $scope.processEvents = function(events){
      console.log(events);
    };

    function random() {
      return Math.floor((Math.random() * 1000) + 1);
    }

    $scope.playGame = function(){

      var myid = random();

      if($scope.userName && $scope.gameName) {
        var postPromise = $http.post('/api/createGame/',{
            'id': myid,
            'command':'CreateGame',
            'user':{'userName':$scope.userName},
            'name':$scope.gameName,
            'timeStamp':'2014-12-02T11:29:29'}
        );
        postPromise.then(function(data){
          console.log(data);
          $scope.processEvents(data.data);
        });

        var post2Promise = $http.post('/api/joinGame/', {
          'id': myid,
          'command':'JoinGame',
          'user':{'userName':$scope.userName},
          'name':$scope.gameName,
          'timeStamp':'2014-12-02T11:29:29'}
        );
        post2Promise.then(function(data) {
          console.log(data);
          $scope.processEvents(data.data);
        });
      }
    };

  });
