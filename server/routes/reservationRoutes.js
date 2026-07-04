const express = require('express');
const router = express.Router();
const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

// Public: create reservation
router.post('/', createReservation);

// Admin: view/manage reservations
router.get('/', protect, getReservations);
router.get('/:id', protect, getReservation);
router.put('/:id', protect, updateReservation);
router.delete('/:id', protect, deleteReservation);

module.exports = router;