/**
 * Created by sindrisigurjonsson on 08/12/14.
 */

'use strict';

var _ = require('lodash');
var app = require('../../app');

module.exports = function (eventStore) {
  return {
    getEvents : function(req,res) {
      eventStore.loadEvents(req.params.id).then(function(events){
        res.json(events);
      })
    },
    getGamesPlayed : function(req,res) {
      eventStore.getGamesPlayed().then(function(count) {
        res.json(count);
      });
    }
  }
}
