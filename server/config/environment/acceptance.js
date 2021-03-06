/**
 * Created by sindrisigurjonsson on 12/12/14.
 */

'use strict';

// Production specific configuration
// =================================
module.exports = {

  //DB Storing
  eventStore:'/eventstore/dbstore',
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
  process.env.IP ||
  undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.PORT ||
  8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
    'mongodb://admin:admin@ds063630.mongolab.com:63630/tictactoe-test'
  }
};
