/**
 * Created by sindrisigurjonsson on 08/12/14.
 */

'use strict';

angular.module('tictactoeApp')
  .factory('TicService', function () {

    var userName;
    var gameName;
    var myType;
    var creator;

    // Public API here
    return {

      setUserName: function (u) {
       userName = u;
      },
      getUserName: function() {
        return userName;
      },
      setGameName: function(g) {
        gameName = g;
      },
      getGameName: function() {
        return gameName;
      },
      getType: function() {
        return myType;
      },
      setType: function(t) {
        myType = t;
      },
      setCreated: function(c) {
        creator = c;
      },
      getCreated: function(){
        return creator;
      }
    };
  });
