const express = require('express');
const router = express.Router();
const { Conference, User } = require('../models');
const { auth, checkRole } = require('../middleware/authMiddleware');

// Create Conference (Organizer only)
router.post('/', auth, checkRole(['ORGANIZER']), async (req, res) => {
    try {
        const { title, description, location, startDate, endDate, submissionDeadline, reviewDeadline } = req.body;
        const conference = await Conference.create({
            title,
            description,
            location,
            startDate,
            endDate,
            submissionDeadline,
            reviewDeadline,
            organizerId: req.user.id
        });
        res.status(201).json(conference);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get All Conferences
router.get('/', async (req, res) => {
    try {
        const conferences = await Conference.findAll({
            include: [{ model: User, as: 'organizer', attributes: ['name', 'email'] }]
        });
        res.json(conferences);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get One Conference
router.get('/:id', async (req, res) => {
    try {
        const conference = await Conference.findByPk(req.params.id, {
            include: [{ model: User, as: 'organizer', attributes: ['name', 'email'] }]
        });
        if (!conference) return res.status(404).json({ message: 'Conference not found' });
        res.json(conference);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add Reviewer to Conference (Organizer only)
router.post('/:id/reviewers', auth, checkRole(['ORGANIZER']), async (req, res) => {
    try {
        const { reviewerId } = req.body;
        const conference = await Conference.findByPk(req.params.id);
        if (!conference) return res.status(404).json({ message: 'Conference not found' });

        // Check if user is organizer of this conference
        if (conference.organizerId !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const reviewer = await User.findByPk(reviewerId);
        if (!reviewer || reviewer.role !== 'REVIEWER') {
            return res.status(400).json({ message: 'Invalid reviewer' });
        }

        await conference.addReviewer(reviewer);
        res.json({ message: 'Reviewer added to conference' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
