/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

var jm = require('jsmockito').JsMockito;
jm.Integration.importTo(global);
var _ = require('lodash');


describe('tictactoe game context using stubs', function() {

  it('should route commands to instantiated tictactoe game with event stream from store and return events. ' +
  'For this test we are using mock style with jsmockito', function() {

    /* jshint ignore:start */

    var mockEventStore = spy({
      loadEvents : function() {

      },
      storeEvents : function() {

      }
    });

    when(mockEventStore).loadEvents('18').thenReturn([]);

    var mockTicTacToe = spy({
      executeCommand : function() {

      }
    });

    when(mockTicTacToe).executeCommand().thenReturn([]);

    var commandHandler = function() {
      return mockTicTacToe;
    }

    var boundedContext = require('./tictactoeBoundedContext')(mockEventStore, commandHandler);

    var emptyCommand = {
      id: "18"
    };

    boundedContext.handleCommand(emptyCommand);

    jm.verify(mockEventStore).loadEvents('18');
    jm.verify(mockEventStore).storeEvents('18');
    jm.verify(mockTicTacToe).executeCommand(emptyCommand);

    /* jshint ignore:end */
  });
});
