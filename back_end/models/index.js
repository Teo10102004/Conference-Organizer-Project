const sequelize = require('../database');
const User = require('./User');
const Conference = require('./Conference');

module.exports = {
    sequelize,
    User,
    Conference
};