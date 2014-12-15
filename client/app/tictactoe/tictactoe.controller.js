/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

angular.module('tictactoeApp')
  .controller('TicTacToeCtrl', function ($scope, $http, $state, TicService) {

    /* jshint ignore:start */
    //Thx to http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    function generateUUID(){
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
    }

    $scope.getCount = function() {
      var getPromise = $http.get('/api/events/e/count/');

      getPromise.then(function(data) {
        $scope.playCount = data.data;
      });
    };

    $scope.myid = generateUUID();
    /* jshint ignore:end */

    $scope.getCount();

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
