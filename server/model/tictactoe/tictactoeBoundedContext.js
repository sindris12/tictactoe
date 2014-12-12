/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

var _ = require('lodash');
var dataBase = require('../../eventstore/dbstore');

module.exports = function(eventStore, commandHandler){

  return {
    handleCommand : function(command){
      var eventStream = eventStore.loadEvents(command.id);
      var events= commandHandler(eventStream).executeCommand(command);
      eventStore.storeEvents(command.id, events);
      dataBase.storeEvents(command.id, events);
      console.log("EVENTSTREAM",eventStream);
      return events;
    }
  }
}
