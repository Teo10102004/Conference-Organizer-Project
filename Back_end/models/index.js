const sequelize = require('../config/database');
const User = require('./User');
const Conference = require('./Conference');
const Paper = require('./Paper');
const Review = require('./Review');

// User - Conference (Organizer creates Conference)
User.hasMany(Conference, { foreignKey: 'organizerId', as: 'organizedConferences' });
Conference.belongsTo(User, { foreignKey: 'organizerId', as: 'organizer' });

// User - Conference (Reviewers assigned to Conference)
User.belongsToMany(Conference, { through: 'ConferenceReviewers', as: 'reviewingConferences', foreignKey: 'reviewerId' });
Conference.belongsToMany(User, { through: 'ConferenceReviewers', as: 'reviewers', foreignKey: 'conferenceId' });

// Conference - Paper
Conference.hasMany(Paper, { foreignKey: 'conferenceId' });
Paper.belongsTo(Conference, { foreignKey: 'conferenceId' });

// User - Paper (Author submits Paper)
User.hasMany(Paper, { foreignKey: 'authorId', as: 'authoredPapers' });
Paper.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Paper - Review
Paper.hasMany(Review, { foreignKey: 'paperId' });
Review.belongsTo(Paper, { foreignKey: 'paperId' });

// User - Review (Reviewer writes Review)
User.hasMany(Review, { foreignKey: 'reviewerId', as: 'writtenReviews' });
Review.belongsTo(User, { foreignKey: 'reviewerId', as: 'reviewer' });

module.exports = {
    sequelize,
    User,
    Conference,
    Paper,
    Review
};
