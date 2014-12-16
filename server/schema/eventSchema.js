/**
 * Created by sindrisigurjonsson on 12/12/14.
 */


var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventsSchema   = new Schema({
  _id: String,
  events : [Schema.Types.Mixed]
});

module.exports = mongoose.model('DBEvents', EventsSchema);
