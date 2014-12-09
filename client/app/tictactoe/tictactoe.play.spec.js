/**
 * Created by sindrisigurjonsson on 09/12/14.
 */

'use strict';

describe('Controller: TicTacToePlayCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var TicController, scope, httpBackend, http;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');
    httpBackend.whenGET('app/tictactoe/tictactoe.html').respond(200);
    httpBackend.whenGET('/api/events/undefined').respond(200);

    scope = $rootScope.$new();
    TicController = $controller('TicTacToePlayCtrl', {
      $scope: scope
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should join a game', function () {

    scope.theid = "18";

    httpBackend.expectPOST('/api/joinGame/', {
      id : "18",
      command: "JoinGame",
      user: {
        userName: "Sindri"
      },
      name: "AwesomeTic",
      timeStamp: "2014-12-02T11:29:29",
      symbol: "O"
    }).respond({
      response: [
        {}
      ]
    });

    httpBackend.expectGET('/api/events/18').respond({
      data: {
        event: "GameJoined",
        user: {
          userName: "Sindri"
        }
        }
    });

    scope.gameName ="AwesomeTic";
    scope.joinGame("Sindri");
    httpBackend.flush();

    expect(scope.processEvents.length).toBe(1);
    expect(scope.userName).toBe("Sindri");
    expect(scope.myType).toBe("O");
    expect(scope.showJoin).toBe(true);
  });

  it('should make a move', function () {

    httpBackend.whenPOST('/api/joinGame/').respond(200);

    scope.theid = "18";

    httpBackend.expectPOST('/api/placeMove', {
      id : "18",
      command: "MakeMove",
      user: {
      },
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [0,0],
        type: "X"
      }
    }).respond({
      response: [
        {}
      ]
    });

    httpBackend.expectGET('/api/events/18').respond({
      data: {
        event: "MoveMade",
        user: {
        },
        move: {
          coordinates: [0,0],
          type: "X"
        }
      }
    });

    scope.makeMove(0,0,"X");
    httpBackend.flush();

    expect(scope.processEvents.length).toBe(1);
    expect(scope.board[0][0]).toBe("X");
  });

  it('should make a move and win the game', function () {

    httpBackend.whenPOST('/api/joinGame/').respond(200);

    scope.theid = "18";

    httpBackend.expectPOST('/api/placeMove', {
      id : "18",
      command: "MakeMove",
      user: {
      },
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [1,1],
        type: "X"
      }
    }).respond({
      response: [
        {}
      ]
    });

    httpBackend.expectGET('/api/events/18').respond({
      data: {
        event: "GameWon",
        user: {
        },
        move: {
          coordinates: [1,1],
          type: "X"
        }
      }
    });

    scope.makeMove(1,1,"X");
    httpBackend.flush();

    expect(scope.processEvents.length).toBe(1);
    expect(scope.board[1][1]).toBe("X");
  });

  it('should try to join a game with no username', function () {

    scope.theid = "18";

    httpBackend.expectPOST('/api/joinGame/', {
      id : "18",
      command: "JoinGame",
      user: {
      },
      name: "AwesomeTic",
      timeStamp: "2014-12-02T11:29:29",
      symbol: "O"
    }).respond({
      response: [
        {}
      ]
    });

    httpBackend.expectGET('/api/events/18').respond({
      data: {
        event: "NoUserName",
        user: {
        },
        name: "AwesomeTic"
      }
    });


    scope.gameName ="AwesomeTic";
    scope.joinGame();
    httpBackend.flush();

    expect(scope.processEvents.length).toBe(1);
    expect(scope.userName).toBe(undefined);
    expect(scope.showJoin).toBe(undefined);
  });

});
