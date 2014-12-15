'use strict';

// Development specific configuration
// ==================================
module.exports = {
  eventStore:'/eventstore/dbstore',
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://admin:admin@ds063630.mongolab.com:63630/tictactoe-dev'
  },

  seedDB: true
};
