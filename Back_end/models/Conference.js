const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conference = sequelize.define('Conference', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    location: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.DATEONLY
    },
    endDate: {
        type: DataTypes.DATEONLY
    },
    submissionDeadline: {
        type: DataTypes.DATE
    },
    reviewDeadline: {
        type: DataTypes.DATE
    }
});

module.exports = Conference;
