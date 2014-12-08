/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

angular.module('tictactoeApp')
  .controller('TicTacToeCtrl', function ($scope, $http) {

    $scope.showCreate = false;
    $scope.showTable = true;
    $scope.myid = random();
    var turn = 0;

    $scope.processEvents = function(events){
      console.log(events);
    };

    function random() {
      return Math.floor((Math.random() * 1000) + 1);
    }

    $scope.yourTurn = function(x,y) {
      if(turn % 2 === 0) {
        turn++;
        makeMove(x,y, "X", $scope.userName);
      } else {
        turn++;
        makeMove(x,y, "O", "Arni");
      }
    }

    function makeMove(x,y,t,u) {
      var postPromise = $http.post('/api/placeMove', {
          'id': $scope.myid,
          'command': 'MakeMove',
          'user': {'userName': u},
          'name': $scope.gameName,
          'timeStamp': '2014-12-02T11:29:29',
          'move': {
            'coordinates': [x,y],
            'type': t
          }}
      );
      postPromise.then(function(data) {
        console.log(data);
        $scope.processEvents(data.data);
      });
    };

    $scope.playGame = function(){

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
          console.log(data);
          $scope.processEvents(data.data);
        });

        var post2Promise = $http.post('/api/joinGame/', {
          'id': $scope.myid,
          'command':'JoinGame',
          'user':{'userName':'Arni'},
          'name':$scope.gameName,
          'timeStamp':'2014-12-02T11:29:29',
          'symbol': 'O'}
        );
        post2Promise.then(function(data) {
          console.log(data);
          $scope.showCreate = true;
          $scope.showTable = false;
          $scope.processEvents(data.data);
        });
      }
    };

  });
