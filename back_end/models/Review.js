const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Review = sequelize.define('Review', { //defining the Review model that will store feedback on articles
    feedback: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed'),
        defaultValue: 'pending'
    },
    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    articleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Review;