const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Paper, Conference } = require('../models');
const { auth, checkRole } = require('../middleware/authMiddleware');
const { assignReviewers } = require('../controllers/assignmentController');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Submit Paper to Conference
router.post('/conferences/:conferenceId/papers', auth, checkRole(['AUTHOR']), upload.single('file'), async (req, res) => {
    try {
        const { title, abstract, keywords } = req.body;
        const { conferenceId } = req.params;

        if (!req.file) {
            return res.status(400).json({ message: 'File is required' });
        }

        const paper = await Paper.create({
            title,
            abstract,
            keywords,
            fileUrl: req.file.path,
            conferenceId,
            authorId: req.user.id,
            status: 'SUBMITTED'
        });

        // Trigger Auto-Assignment
        await assignReviewers(paper);

        res.status(201).json(paper);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get Papers for Conference (Organizer/Reviewer?)
// For now, let's allow Organizer to see all papers
router.get('/conferences/:conferenceId/papers', auth, checkRole(['ORGANIZER', 'REVIEWER']), async (req, res) => {
    try {
        const papers = await Paper.findAll({
            where: { conferenceId: req.params.conferenceId }
        });
        res.json(papers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
