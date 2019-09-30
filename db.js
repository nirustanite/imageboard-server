const Sequelize = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'

console.log("database url:"+databaseUrl)

const db = new Sequelize(databaseUrl);

db.sync()
  .then(() => console.log('Database schema created'))
  .catch(console.error)

module.exports = db;