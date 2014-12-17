/**
 * Created by sindrisigurjonsson on 16/12/14.
 */

module.exports = {
  /*
  development: {
    schema: { 'migration': {} },
    modelName: 'Migration',
    db: process.env.MONGOHQ_URL || 'mongodb://admin:admin@ds063630.mongolab.com:63630/tictactoe-dev'
  },*/
  acceptance: {
    schema: { 'migration': {} },
    modelName: 'Migration',
    db: process.env.MONGOHQ_URL || 'mongodb://admin:admin@ds063630.mongolab.com:63630/tictactoe-test'
  },
  production: {
    schema: { 'migration': {} },
    modelName: 'Migration',
    db: process.env.MONGOHQ_URL || 'mongodb://admin:admin@ds063630.mongolab.com:63630/tictactoe'
  }
};
