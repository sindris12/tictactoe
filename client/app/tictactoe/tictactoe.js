/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

angular.module('tictactoeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tictactoe', {
        url: '/',
        templateUrl: 'app/tictactoe/tictactoe.html',
        controller: 'TicTacToeCtrl'
      }).state('play', {
        url: '/play/{id}',
        templateUrl: 'app/tictactoe/tictactoe.play.html',
        controller: 'TicTacToePlayCtrl'
      });
  });
