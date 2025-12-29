const { DataTypes } = require('sequelize'); //this will help to define the data types
const sequelize = require('../database'); 

const Article = sequelize.define('Article', { //defining the Article model
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT, // This will simulate the file content or link
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'changes_requested'),
        defaultValue: 'pending'
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conferenceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Article; 