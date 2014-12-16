/**
 * Created by sindrisigurjonsson on 10/12/14.
 */

'use strict';

var gameDSL = require('./game.dsl.js');
var playDSL = require('./play.dsl.js');

describe('TicTacToe game play', function() {
  var page;
  var game;
  var playPage;
  var play;

  beforeEach(function() {
    browser.get('/');
    page = require('./createGame.po.js');
    playPage = require('./playGame.po.js');
    play = playDSL(playPage);
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

  it('should create, join and play a simple game', function() {
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

        // switch to original window
        browser.switchTo().window(originalHandle);

        browser.driver.wait(function(){
          return    browser.driver.isElementPresent(by.css('#tictactoe')).then(function(el){
            return el === true;
          });
        }).then(function(){
            game.expectGameBoardShowing();

            play.MakeMoveCell1('X');
            browser.switchTo().window('second-window');
            play.MakeMoveCell2('O');
            browser.switchTo().window(originalHandle);
            play.MakeMoveCell4('X');
            browser.switchTo().window('second-window');
            play.MakeMoveCell3('O');
            browser.switchTo().window(originalHandle);
            play.MakeMoveCell7('X');
            game.waitForTictactoePage();
            play.CheckOutcome("Game Over: Sindri won the game!");
        });

        // do something within context of original window

        // closes the current window
        browser.executeScript('window.close()');
      });
    })
  });

  it('should create, join and play a game that ends with a draw', function() {
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

        // switch to original window
        browser.switchTo().window(originalHandle);

        browser.driver.wait(function(){
          return    browser.driver.isElementPresent(by.css('#tictactoe')).then(function(el){
            return el === true;
          });
        }).then(function(){
          game.expectGameBoardShowing();

          play.MakeMoveCell1('X');
          browser.switchTo().window('second-window');
          play.MakeMoveCell2('O');
          browser.switchTo().window(originalHandle);
          play.MakeMoveCell3('X');
          browser.switchTo().window('second-window');
          play.MakeMoveCell4('O');
          browser.switchTo().window(originalHandle);
          play.MakeMoveCell6('X');
          browser.switchTo().window('second-window');
          play.MakeMoveCell5('O');
          browser.switchTo().window(originalHandle);
          play.MakeMoveCell7('X');
          browser.switchTo().window('second-window');
          play.MakeMoveCell9('O');
          browser.switchTo().window(originalHandle);
          play.MakeMoveCell8('X');
          game.waitForTictactoePage();
          play.CheckOutcome("Game Over: Game ended with a draw");
        });

        // closes the current window
        browser.executeScript('window.close()');
      });
    })
  });

  it('should get a message that gameName is missing', function() {

    game.nameOfUser("Sindri");
    game.createGame();
    game.waitForTictactoePage();

    browser.driver.wait(function(){
      return    browser.driver.isElementPresent(by.css('#missingInfo')).then(function(el){
        return el === true;
      });
    }).then(function(){
      expect(page.missing.getText()).toBe('UserName, GameName or both are missing');
    });
  });

  it('should get a message that userName is missing', function() {

    game.nameOfGame("lol");
    game.createGame();
    game.waitForTictactoePage();

    browser.driver.wait(function(){
      return    browser.driver.isElementPresent(by.css('#missingInfo')).then(function(el){
        return el === true;
      });
    }).then(function(){
      expect(page.missing.getText()).toBe('UserName, GameName or both are missing');
    });
  });

});
