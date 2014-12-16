
exports.up = function(next){

  var migration = require('../server/eventstore/migrations/migrateCoordinates');
  migration.up(next);
};

exports.down = function(next){
  next();
};
