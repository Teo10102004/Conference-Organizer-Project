const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paper = sequelize.define('Paper', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abstract: {
        type: DataTypes.TEXT
    },
    keywords: {
        type: DataTypes.STRING
    },
    fileUrl: {
        type: DataTypes.STRING, // Path to the PDF file
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('SUBMITTED', 'IN_REVIEW', 'ACCEPTED', 'REJECTED', 'REVISION_REQUIRED'),
        defaultValue: 'SUBMITTED'
    }
});

module.exports = Paper;
