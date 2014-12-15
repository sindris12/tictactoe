/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

describe('Controller: TicTacToeCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var TicController, scope, httpBackend, http, state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http, $state) {
    http = $http;
    state = $state;
    httpBackend = $injector.get('$httpBackend');
    httpBackend.whenGET('app/tictactoe/tictactoe.html').respond(200);
    httpBackend.whenGET('/api/events/e/count/').respond(200);
    /* jshint ignore:start */
    spyOn(state, 'go');
    /* jshint ignore:end */
    scope = $rootScope.$new();
    TicController = $controller('TicTacToeCtrl', {
      $scope: scope
    });
  }));

  /* jshint ignore:start */

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  /* jshint ignore:end */

  it('should process events and call state to route to play page', function () {

    var event = [{
      id: '18',
      event: 'GameCreated'
    }];

    scope.processEvents(event);

    expect(state.go).toHaveBeenCalled();
    httpBackend.flush();
  });

  it('should process events and call state', function () {

    var event = [{
      id: '18',
      event: 'GameJoined'
    }];
    scope.processEvents(event);

    expect(state.go).toHaveBeenCalled();
    httpBackend.flush();
  });

  it('should post variables from scope for name and userName and process resulting events', function () {

    scope.myid = '18';

    httpBackend.expectPOST('/api/createGame/', {
      id : '18',
      command: 'CreateGame',
      user: {
        userName: 'Sindri'
      },
      name: 'AwesomeTic',
      timeStamp: '2014-12-02T11:29:29',
      symbol: 'X'
    }).respond({
      response: [
        {}
      ]
    });

    scope.gameName ='AwesomeTic';
    scope.userName = 'Sindri';

    scope.newGame();
    httpBackend.flush();

    expect(scope.processEvents.length).toBe(1);
  });
});
