/**
 * Created by sindrisigurjonsson on 16/12/14.
 */

var Event = require('../../schema/eventSchema');
var _ = require('lodash');

module.exports = {
  up: function(done){
    Event.find({},  function(err, games){
      if(err){
        done(err);
      }
      _.each(games, function(game){

        _.each(game.events, function(event){
          if(event.move && event.move.coordinates){
            event.move.xy = {x: event.move.coordinates[0], y: event.move.coordinates[1]};
          }
        });
        game.markModified('events');
        game.save(function(err){
          err && console.error('ERROR SAVING', err);
        });
      });
      return done(undefined, games);
    });
  },
  down:function(){
    throw new Error("Down not implemented yet");
  }
};
