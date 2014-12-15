/**
 * Created by sindrisigurjonsson on 08/12/14.
 */

/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(eventStore){
  var controller = require('./events.controller')(eventStore);

  router.get('/e/count', controller.getGamesPlayed);
  router.get('/:id', controller.getEvents);

  return {
    router: router
  }
};
