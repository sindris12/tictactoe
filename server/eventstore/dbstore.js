/**
 * Created by sindrisigurjonsson on 12/12/14.
 */

var DBEvents = require('../schema/eventSchema');
var q = require('q');

module.exports = function(){
  return {
    storeEvents : function(id, event){
      console.log("STORE ID!!", event);

      var deferred = q.defer();

      DBEvents.update( { "_id" : id }, { $push : { "events" : event[0]}}, { upsert: true }, function(err, result) {

        if(err) {
          deferred.reject(err);
        }
        deferred.resolve(result);
      });

      return deferred.promise;
    },
    getGamesPlayed : function() {

      var deferred = q.defer();

      DBEvents.count(function (err, count) {
        if(err) throw err;

        deferred.resolve(count);
      });

      return deferred.promise;
    },
    loadEvents : function(id){

      var deferred = q.defer();

      DBEvents.findById(id, function(err, stream){
        if(err){
          deferred.reject(err);
        }
        deferred.resolve(stream && stream.events || []);
      });

      return deferred.promise;
    }
  }
}
