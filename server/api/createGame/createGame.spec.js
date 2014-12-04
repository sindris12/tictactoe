/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/createGame', function() {
  it('should respond with event in JSON array', function(done) {
    var command = {
      id : "18",
      command: "CreateGame",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:29"
    };
    var req = request(app);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        console.log("RESPONSE", res.body);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});
