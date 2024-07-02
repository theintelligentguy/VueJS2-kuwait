const Sequelize = require('sequelize');
const sequelize = new Sequelize('securities_app', 'root', 'slotEXtension@2024', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.SecurityTransaction = require('./securityTransaction')(sequelize, Sequelize);

module.exports = db;
