const sequelize = require('../database');
const User = require('./User');
const Conference = require('./Conference');
const Article = require('./Article');
const Review = require('./Review');

module.exports = {
    sequelize,
    User,
    Conference,
    Article,
    Review
};