const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Public: create order
router.post('/', createOrder);

// Admin: manage orders
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.put('/:id', protect, updateOrder);
router.delete('/:id', protect, deleteOrder);

module.exports = router;