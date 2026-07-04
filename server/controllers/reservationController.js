// Reservation Controller
const Reservation = require('../models/Reservation');

// @desc    Get all reservations
// @route   GET /api/reservations
exports.getReservations = async (req, res) => {
  try {
    const { date, status } = req.query;
    let query = {};

    if (date) {
      query.date = new Date(date);
    }
    if (status) {
      query.status = status;
    }

    const reservations = await Reservation.find(query).sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single reservation
// @route   GET /api/reservations/:id
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new reservation
// @route   POST /api/reservations
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update reservation
// @route   PUT /api/reservations/:id
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete reservation
// @route   DELETE /api/reservations/:id
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json({ message: 'Reservation removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};