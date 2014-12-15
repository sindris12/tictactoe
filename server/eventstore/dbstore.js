/**
 * Created by sindrisigurjonsson on 12/12/14.
 */

var DBEvents = require('../schema/eventSchema');
var q = require('q');

module.exports = {

    storeEvents : function(id, event){
      DBEvents.update( { "_id" : id }, { $push : { "events" : event[0]}}, { upsert: true }, function(err, result) {
        console.log("DB RESULT: ", result);
      });
    },
    gamesPlayed : function() {

      var deferred = q.defer();

      DBEvents.count(function (err, count) {
        if(err) throw err;

        deferred.resolve(count);
      });

      return deferred.promise;
    }
};

