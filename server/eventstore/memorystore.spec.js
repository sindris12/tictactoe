/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

var memoryStore = require('./memorystore');
var should = require('should');

describe('In memory event store', function() {
  it('Should return empty array when trying to load a unknown event', function() {

    var store = memoryStore();

    store.loadEvents('1234').then(function(loaded) {
      should(loaded.length).be.exactly(0);
      should(loaded).be.instanceof(Array);
    });
  });

  it('Should return events previously stored', function() {

    var store = memoryStore();

    store.storeEvents('18', [{"id":"1", name: "Sindri", gameName: "Awesome"}]).then(function() {
      store.loadEvents('18').then(function(loaded) {
        should(loaded).eql([{"id":"1", name: "Sindri", gameName: "Awesome"}]);
      });
    });
  });



  it('should append stored events to events previously stored',function(){
    var store = memoryStore();

    store.storeEvents('18', [{"id":"1"}]).then(function() {
      store.storeEvents('18', [{"id":"2"}]).then(function() {
        store.loadEvents('18').then(function(loaded) {
          should(loaded).eql([{"id":"1"},{"id":"2"}]);
        });
      });
    });
  });
});
