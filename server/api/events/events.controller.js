/**
 * Created by sindrisigurjonsson on 08/12/14.
 */

'use strict';

var _ = require('lodash');
var app = require('../../app');

// Get list of events
exports.getEvents = function(req, res) {

  if(!app.eventStore) {
    app.eventStore = require('../../eventstore/memorystore')();
  }

  var store = app.eventStore;

  console.log(req.params.id);

  res.json(store.loadEvents(req.params.id));
};
