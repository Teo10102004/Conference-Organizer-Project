const { DataTypes } = require('sequelize'); 
const sequelize = require('../database');

const Conference = sequelize.define('Conference', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY
    },
    description: {
        type: DataTypes.TEXT
    },
    organizerId: { 
        type: DataTypes.INTEGER, allowNull: false  //added organizerId to link to User model
    }
});

module.exports = Conference; //added missing module export