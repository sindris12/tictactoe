/**
 * Created by sindrisigurjonsson on 10/12/14.
 */

module.exports = function(page){
  var tictactoe;

  function nameOfGame(gameName) {
    page.gameName.sendKeys(gameName);
  }

  function nameOfUser(userName) {
    page.userName.sendKeys(userName);
  }

  function nameOfJoinUser(userName) {
    page.joinName.sendKeys(userName);
  }

  function createGame() {
    page.newGame.click();
  }

  function joinGame() {
    page.joinGame.click();
  }

  function waitForTictactoePage() {
    browser.waitForAngular();
  }

  function expectWaitForPlayerToShow() {
    expect(page.bannerText.getText()).toBe('Waiting for player to join the game');
  }

  function expectEnjoy() {
    expect(page.bannerText.getText()).toBe('Enjoy the game');
  }

  function expectGameBoardShowing() {
    expect(page.board).toBeDefined();
  }

  return {
    nameOfGame:nameOfGame,
    nameOfUser:nameOfUser,
    nameOfJoinUser:nameOfJoinUser,
    createGame:createGame,
    waitForTictactoePage:waitForTictactoePage,
    expectWaitForPlayerToShow:expectWaitForPlayerToShow,
    joinGame:joinGame,
    expectEnjoy:expectEnjoy,
    expectGameBoardShowing:expectGameBoardShowing
  }
};
