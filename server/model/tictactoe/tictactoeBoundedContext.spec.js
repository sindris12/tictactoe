/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

var jm = require('jsmockito').JsMockito;
jm.Integration.importTo(global);
var _ = require('lodash');
var q = require('q');

function myPromise(value) {
  var deferred = q.defer();
  deferred.resolve(value);
  return deferred.promise;
}


describe('tictactoe game context using stubs', function() {

  it('should route commands to instantiated tictactoe game with event stream from store and return events. ' +
  'For this test we are using mock style with jsmockito', function() {

    /* jshint ignore:start */

    var mockEventStore = spy({
      loadEvents : function() {
        return myPromise([]);
      },
      storeEvents : function(events) {
        return myPromise(events);
      }
    });

    var mockTicTacToe = spy({
      executeCommand : function() {
        return myPromise([]);
      }
    });

    var commandHandler = function() {
      return mockTicTacToe;
    }

    var boundedContext = require('./tictactoeBoundedContext')(mockEventStore, commandHandler);

    var emptyCommand = {
      id: "18"
    };

    boundedContext.handleCommand(emptyCommand).then(function() {
      jm.verify(mockEventStore).loadEvents('18');
      jm.verify(mockEventStore).storeEvents('18');
      jm.verify(mockTicTacToe).executeCommand(emptyCommand);
      done();
    });

    /* jshint ignore:end */
  });
});
