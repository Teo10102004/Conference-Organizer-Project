// database.js
 //DATABASE CONNECTION SETUP
 // This module initializes the Sequelize ORM and connects to the SQLite database.

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

module.exports = sequelize;