/**
 * Created by sindrisigurjonsson on 10/12/14.
 */

'use strict';

var gameDSL = require('./game.dsl.js');

describe('TicTacToe game play', function() {
  var page;
  var game;
  var playPage;
  var playDSL;

  beforeEach(function() {
    browser.get('/');
    page = require('./createGame.po.js');
    playPage = require('./playGame.po.js');
    playDSL = gameDSL(playPage);
    game = gameDSL(page);
  });

  it('should accept game name and username and create game', function() {

    expect(page.h1El.getText()).toBe('TicTacToe');
    expect(page.bannerText.getText()).toBe('Play the world famous TicTacToe game here!');

    game.nameOfGame("Cheese!");
    game.nameOfUser("Jerry!");
    game.createGame();
    game.waitForTictactoePage();
    game.expectWaitForPlayerToShow();
  });

  it('should create game and from another window join the game', function() {

    game.nameOfGame("Cheese!");
    game.nameOfUser("Sindri");
    game.createGame();
    game.waitForTictactoePage();

    browser.getCurrentUrl().then(function(data) {
      console.log("URL ", data);

      browser.getAllWindowHandles().then(function (handles) {

        // handle of first window
        var originalHandle = handles[0];

        // open new window
        browser.executeScript('window.open("' + data +'", "second-window")');

        // switch to new window
        browser.switchTo().window('second-window');

        game.nameOfJoinUser("Arni");
        game.joinGame();
        game.waitForTictactoePage();
        game.expectEnjoy();
        game.expectGameBoardShowing();

        // do something within context of new window

        // switch to original window
        browser.switchTo().window(originalHandle);

        // do something within context of original window

        // closes the current window
        browser.executeScript('window.close()');
      });
    })
  });

  it('should create, join and play a game', function() {
    game.nameOfGame("Cheese!");
    game.nameOfUser("Sindri");
    game.createGame();
    game.waitForTictactoePage();

    browser.getCurrentUrl().then(function(data) {
      console.log("URL ", data);

      browser.getAllWindowHandles().then(function (handles) {

        // handle of first window
        var originalHandle = handles[0];

        // open new window
        browser.executeScript('window.open("' + data +'", "second-window")');
        //var secondHandle = handles[1];

        // switch to new window
        browser.switchTo().window('second-window');

        game.nameOfJoinUser("Arni");
        game.joinGame();
        game.waitForTictactoePage();

        // do something within context of new window

        // switch to original window
        browser.switchTo().window(originalHandle);

        // do something within context of original window

        // closes the current window
        browser.executeScript('window.close()');
      });
    })
  });
});
