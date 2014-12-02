/**
 * Created by sindrisigurjonsson on 02/12/14.
 */

var _ = require('lodash');

module.exports = function(history){
  var fullGame = false;
  _.each(history, function(event){
    if(event.event === "GameJoined"){
      fullGame = true;
    }
  });
  return {
    fullGame : function(){
      return fullGame;
    }
  }
};
