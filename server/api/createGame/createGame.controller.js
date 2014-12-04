/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

'use strict';

var _ = require('lodash');
var boundedContext = require('../../model/tictactoe/tictactoeBoundedContext');
var tictactoeHandler = require('../../model/tictactoe/aggregate/tictactoe');

exports.createGame = function(req, res) {

  var store = {
    loadEvents : function(id){
      console.log("Loading events for id: ", id);
      return [];
    }
  }

  var context = boundedContext(store, tictactoeHandler);
  var result = context.handleCommand(req.body);
  res.json(result);
};
