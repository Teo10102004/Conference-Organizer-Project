
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

 // USER MODEL
// Defines the structure of the User table in the database.
// Supports three roles: Organizer, Author, Reviewer.

const User = sequelize.define('User', {
    // Unique email for login
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    //Password (stored as plain text for this prototype, should be hashed in production)
    password: { type: DataTypes.STRING, allowNull: false },
    //Name of the user
    name: { type: DataTypes.STRING },
    // Role determines permissions (Organizer, Author, Reviewer)
    role: { 
        type: DataTypes.ENUM('organizer', 'author', 'reviewer'), 
        defaultValue: 'author' 
    }
});

module.exports = User;