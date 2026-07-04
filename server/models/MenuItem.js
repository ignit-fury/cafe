// Menu Item Model
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['sandwiches', 'wraps', 'fries', 'premium-fries', 'potato-specials', 'toast', 'burgers', 'pizza', 'pasta', 'mojitos', 'frappe', 'other']
  },
  image: {
    type: String,
    default: ''
  },
  isVeg: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);