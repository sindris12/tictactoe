/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

describe('Controller: TicTacToeCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var TicController, scope, httpBackend, http;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');
    httpBackend.whenGET('app/tictactoe/tictactoe.html').respond(200);

    scope = $rootScope.$new();
    TicController = $controller('TicTacToeCtrl', {
      $scope: scope
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should post variables from scope for name and userName and process resulting events', function () {

    scope.myid = "18";

    httpBackend.expectPOST('/api/createGame/', {
      id : "18",
      command: "CreateGame",
      user: {
        userName: "Sindri"
      },
      name: "AwesomeTic",
      timeStamp: "2014-12-02T11:29:29",
      symbol: "X"
    }).respond({
      response: [
        {}
      ]
    });

    scope.gameName ="AwesomeTic";
    scope.userName = "Sindri";

    scope.newGame();
    httpBackend.flush();

    expect(scope.processEvents.length).toBe(1);
  });
});
