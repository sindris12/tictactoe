/**
 * Created by sindrisigurjonsson on 05/12/14.
 */

'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/placeMove', function() {
  it('should respond with event in JSON array', function(done) {
    var command = {
      id: "18",
      command: "MakeMove",
      user: {
        userName: "Sindri"
      },
      name: "EliteTicTacToe",
      timeStamp: "2014-12-02T11:30:55",
      move: {
        coordinates: [3, 3],
        type: "X"
      }
    };
    var req = request(app);
    req
      .post('/api/placeMove')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
