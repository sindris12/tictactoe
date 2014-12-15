/**
 * Created by sindrisigurjonsson on 08/12/14.
 */

/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

'use strict';

var express = require('express');
var controller = require('./events.controller');

var router = express.Router();

router.get('/:id', controller.getEvents);
router.get('/e/count', controller.getGamesPlayed);

module.exports = router;
