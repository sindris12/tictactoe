/**
 * Created by sindrisigurjonsson on 10/12/14.
 */

'use strict';

var CreateGamePage = function() {

  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.bannerText = this.heroEl.element(by.css('.lead'));

  this.container = element(by.css('.container'));
  this.gameName = element(by.css('#inputGameName'));
  this.userName = element(by.css('#inputUserName'));
  this.newGame = element(by.css('#createGame'));
  this.joinName = element(by.css('#inputJoinUserName'));
  this.joinGame = element(by.css('#joinGame'));
  this.board = element(by.css('#tictactoe'));
};

module.exports = new CreateGamePage();
