/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

var _ = require('lodash');
var q = require('q');

module.exports = function(eventStore, commandHandler){

  return {
    handleCommand : function(command){

      var deferred = q.defer();

      eventStore.loadEvents(command.id).then(function(eventStream) {

        var events = commandHandler(eventStream).executeCommand(command);

        eventStore.storeEvents(command.id, events).then(function() {
          deferred.resolve(events);
        }, function(err) {
          deferred.reject(err);
        })
      });
      return deferred.promise;
    }
  }
};
