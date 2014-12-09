/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

var memoryStore = require('./memorystore');
var should = require('should');

describe('In memory event store', function() {
  it('Should return empty array when trying to load a unknown event', function() {

    var store = memoryStore();

    var loadedEvents = store.loadEvents('1234');

    should(loadedEvents.length).be.exactly(0);
    should(loadedEvents).be.instanceof(Array);

  });

  it('Should return events previously stored', function() {

    var store = memoryStore();

    store.storeEvents('18', [{"id":"1", name: "Sindri", gameName: "Awesome"}]);

    var loadedEvents = store.loadEvents('18');
    console.log(loadedEvents);
    should(loadedEvents).eql([{"id":"1", name: "Sindri", gameName: "Awesome"}]);
  });


  it('should append stored events to events previously stored',function(){
    var store = memoryStore();

    store.storeEvents('18', [{"id":"1"}]);
    store.storeEvents('18', [{"id":"2"}]);

    var loadedEvents = store.loadEvents('18');

    should(loadedEvents).eql([{"id":"1"},{"id":"2"}]);
  });
});
