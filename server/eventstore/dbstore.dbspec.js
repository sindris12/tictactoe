/**
 * Created by sindrisigurjonsson on 15/12/14.
 */

var DBStore = require('./dbstore');
var should = require('should');
var eventSchema = require('../schema/eventSchema');
/*jshint ignore:start */
describe('MongoDB Storing', function() {

  beforeEach(function(){
    eventSchema.remove().exec();
  });

  it('should return a empty array for unknown id', function() {
    var store = DBStore();
    store.loadEvents('123456').then(function(err, loaded){
      should(loaded.length).be.exactly(0);
      should(loaded).be.instanceof(Array);
    },
    function(err) {
      assert.fail('Load event failed', err);
    });
  });

  it('Should return a stored event', function() {
    var store = DBStore();
    store.storeEvents('12345678', [{'command':'GameCreated'}]).then(function(){
      store.loadEvents('12345678').then(function(loaded){
        try {
          should(loaded[0].command).be.exactly('GameCreated');
        } catch (err) {
          return done(err);
        }
      });
    });
  });

  it('Event added to event array of obj in db', function() {
    var store = DBStore();

    store.storeEvents('123456', [{'command': 'GameCreated'}]).then(function(){
      store.storeEvents('123456', [{'command': 'GameJoined'}]).then(function(){
        store.loadEvents('123456').then(function(loaded){

          try {
            should(loaded[0].command).be.exactly('GameCreated');
            should(loaded[1].command).be.exactly('GameJoined');
          } catch(err) {
            return done(err);
          }
        });
      });
    });
  });

  it('Should store two seprate events and check how many diffrent events have been stored', function() {

    var store = DBStore();

    store.storeEvents('this-is-id-1', [{event: 'GameCreated'}]).then(function () {
      store.storeEvents('this-is-id-2', [{event: 'GameCreated'}]).then(function () {
        store.getGamesPlayed().then(function (count) {
          should(count).be.exactly(2);
        });
      });
    });
  });
});
/*jshint ignore:end */

