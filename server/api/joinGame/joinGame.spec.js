/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/joinGame', function() {
  it('should respond with event in JSON array', function(done) {
    var command = {
      id: "18",
      command: "JoinGame",
      user: {
        userName: "Arni"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:29:59"
    };
    var req = request(app);
    req
      .post('/api/joinGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
