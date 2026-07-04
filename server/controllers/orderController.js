// Order Controller
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// Generate order number
const generateOrderNumber = () => {
  return 'HB-' + Date.now().toString().slice(-4) + Math.floor(Math.random() * 1000);
};

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.itemId', 'name image').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.itemId', 'name image');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { customerName, phone, deliveryType, items, total, notes } = req.body;

    // Create order items with item details
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const menuItem = await MenuItem.findById(item.itemId);
        return {
          itemId: item.itemId,
          name: menuItem ? menuItem.name : item.name,
          price: item.price,
          quantity: item.quantity
        };
      })
    );

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      customerName,
      phone,
      deliveryType,
      items: orderItems,
      total,
      notes
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};