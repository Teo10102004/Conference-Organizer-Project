const { User, Conference, Review } = require('../models');

const assignReviewers = async (paper) => {
    try {
        const conference = await Conference.findByPk(paper.conferenceId, {
            include: [{ model: User, as: 'reviewers' }]
        });

        if (!conference || !conference.reviewers || conference.reviewers.length === 0) {
            console.log('No reviewers found for this conference.');
            return;
        }

        const reviewers = conference.reviewers;

        // Simple random assignment of 2 reviewers
        // In a real app, we might check workload, expertise, conflict of interest (same affiliation), etc.

        // Shuffle reviewers
        const shuffled = reviewers.sort(() => 0.5 - Math.random());

        // Pick top 2 (or less if not enough reviewers)
        const selectedReviewers = shuffled.slice(0, 2);

        for (const reviewer of selectedReviewers) {
            await Review.create({
                paperId: paper.id,
                reviewerId: reviewer.id,
                status: 'PENDING' // Assuming we might want a status on Review model later, currently it just exists
            });
            console.log(`Assigned reviewer ${reviewer.name} to paper ${paper.id}`);
        }

    } catch (error) {
        console.error('Error assigning reviewers:', error);
    }
};

module.exports = { assignReviewers };
