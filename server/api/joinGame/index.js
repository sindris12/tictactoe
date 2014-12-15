/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

var express = require('express');

module.exports = function(eventStore){

  var controller = require('../command.controller')(eventStore);

  var router = express.Router();
  router.post('/', controller.executeCommand);

  return {
    router:router
  }
}

