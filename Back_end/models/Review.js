const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    score: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    commentsToAuthor: {
        type: DataTypes.TEXT
    },
    commentsToOrganizer: {
        type: DataTypes.TEXT
    },
    recommendation: {
        type: DataTypes.ENUM('ACCEPT', 'REJECT', 'REVISION_REQUIRED')
    }
});

module.exports = Review;
