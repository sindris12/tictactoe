/**
 * Created by sindrisigurjonsson on 10/12/14.
 */

'use strict';


var PlayGamePage = function() {

  this.cell1 = element(by.css('#cell1'));
  this.cell2 = element(by.css('#cell2'));
  this.cell3 = element(by.css('#cell3'));
  this.cell4 = element(by.css('#cell4'));
  this.cell5 = element(by.css('#cell5'));
  this.cell6 = element(by.css('#cell6'));
  this.cell7 = element(by.css('#cell7'));
  this.cell8 = element(by.css('#cell8'));
  this.cell9 = element(by.css('#cell9'));
  this.winner = element(by.css('#whoWon'));
};

module.exports = new PlayGamePage();

