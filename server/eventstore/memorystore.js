/**
 * Created by sindrisigurjonsson on 04/12/14.
 */

module.exports = function(){
  var store = {};
  return {
    loadEvents : function(id){
      return store[id] || [];
    },
    storeEvents: function(id, events){
      store[id] = (store[id] || []).concat(events);
    }
  }
}
