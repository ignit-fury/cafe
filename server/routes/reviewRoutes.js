const express = require('express');
const router = express.Router();
const { createReview, getApprovedReviews, getAllReviews, updateReviewStatus, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Public
router.post('/', createReview);
router.get('/approved', getApprovedReviews);

// Admin
router.get('/', protect, getAllReviews);
router.put('/:id/status', protect, updateReviewStatus);
router.delete('/:id', protect, deleteReview);

module.exports = router;
