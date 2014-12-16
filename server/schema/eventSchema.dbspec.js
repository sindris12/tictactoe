/**
 * Created by sindrisigurjonsson on 15/12/14.
 */

'use strict';

var app = require('../app');
var should = require('should');
/*jshint ignore:start */
describe('game store', function() {
  it('should store event history in db', function(done) {

    var Schema = require('./eventSchema');

    var event = {
      _id:'18',
      events:[{event:"GameCreated"}]
    };

    Schema.create(event, function(err, event) {
      if(err) {
        throw(err);
      }
      event._id.should.not.be.empty;
      return done();
    });
  });
});
/*jshint ignore:end */
