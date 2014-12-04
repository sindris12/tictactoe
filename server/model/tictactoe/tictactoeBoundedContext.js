/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

var _ = require('lodash');

module.exports = function(eventStore, commandHandler){

  return {
    handleCommand : function(command){
      var eventStream = eventStore.loadEvents(command.id);
      return commandHandler(eventStream).executeCommand(command);
    }
  }
}
