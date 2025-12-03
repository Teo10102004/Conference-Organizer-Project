const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('ORGANIZER', 'AUTHOR', 'REVIEWER'),
        allowNull: false,
        defaultValue: 'AUTHOR'
    },
    affiliation: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.TEXT
    }
});

module.exports = User;
