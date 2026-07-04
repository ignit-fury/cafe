const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');

dotenv.config();

const menuData = [
  { name: 'Classic Grilled Sandwich', description: 'Grilled bread with cheese, tomato, and fresh herbs.', price: 149, category: 'sandwiches', isVeg: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop' },
  { name: 'Chicken Club Sandwich', description: 'Triple-layered sandwich with grilled chicken, bacon, lettuce, and mayo.', price: 199, category: 'sandwiches', isVeg: false, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&h=400&fit=crop' },
  { name: 'Paneer Tikka Wrap', description: 'Spiced paneer chunks wrapped in a soft tortilla with mint chutney.', price: 129, category: 'wraps', isVeg: true, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop' },
  { name: 'Chicken Shawarma Wrap', description: 'Juicy marinated chicken with garlic sauce and pickled veggies.', price: 169, category: 'wraps', isVeg: false, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop' },
  { name: 'Truffle Fries', description: 'Crispy fries tossed in truffle oil with parmesan and herbs.', price: 179, category: 'fries', isVeg: true, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop' },
  { name: 'Loaded Cheese Fries', description: 'Fries topped with melted cheese, jalapeños, and sour cream.', price: 199, category: 'fries', isVeg: true, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=400&fit=crop' },
  { name: 'Classic Cheeseburger', description: 'Juicy beef patty with cheddar, lettuce, tomato, and special sauce.', price: 229, category: 'burgers', isVeg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop' },
  { name: 'Veggie Burger', description: 'Crispy bean patty with avocado, sprouts, and tangy mayo.', price: 179, category: 'burgers', isVeg: true, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop' },
  { name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce.', price: 249, category: 'pizza', isVeg: true, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=400&fit=crop' },
  { name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni and melted mozzarella.', price: 299, category: 'pizza', isVeg: false, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop' },
  { name: 'Penne Arrabbiata', description: 'Penne pasta in a spicy tomato sauce with garlic and basil.', price: 199, category: 'pasta', isVeg: true, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop' },
  { name: 'Creamy Mushroom Pasta', description: 'Fusilli in a rich mushroom cream sauce with parmesan.', price: 229, category: 'pasta', isVeg: true, image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&h=400&fit=crop' },
  { name: 'Mango Mojito', description: 'Refreshing blend of fresh mango, mint, lime, and soda.', price: 139, category: 'mojitos', isVeg: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=400&fit=crop' },
  { name: 'Classic Mojito', description: 'Fresh mint, lime, sugar, and soda water over crushed ice.', price: 119, category: 'mojitos', isVeg: true, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop' },
  { name: 'Berry Mojito', description: 'Mixed berries muddled with mint and sparkling soda.', price: 149, category: 'mojitos', isVeg: true, image: 'https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=600&h=400&fit=crop' },
  { name: 'Mocha Frappe', description: 'Blended coffee with chocolate, milk, and whipped cream.', price: 159, category: 'frappe', isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&h=400&fit=crop' },
  { name: 'Caramel Frappe', description: 'Sweet caramel blended with coffee, milk, and ice.', price: 159, category: 'frappe', isVeg: true, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop' },
  { name: 'Cold Coffee', description: 'Chilled coffee blended with milk and ice cream.', price: 139, category: 'frappe', isVeg: true, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Seed admin user
    const adminExists = await User.findOne({ email: 'admin@heartnbrew.in' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await User.create({
        name: 'Admin',
        email: 'admin@heartnbrew.in',
        password: hashedPassword,
        role: 'superadmin',
      });
      console.log('Admin user created: admin@heartnbrew.in / admin123');
    } else {
      console.log('Admin user already exists');
    }

    // Always update menu items with images
    console.log('Updating menu items with images...');
    for (const item of menuData) {
      await MenuItem.findOneAndUpdate(
        { name: item.name },
        { image: item.image },
        { upsert: true, new: true }
      );
    }
    console.log(`Updated ${menuData.length} menu items with images`);

    console.log('Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
