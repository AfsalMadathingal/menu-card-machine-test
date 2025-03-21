const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');

// Get all menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('items');
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single menu
exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('items');
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create menu
exports.createMenu = async (req, res) => {
  try {
    const menu = new Menu({
      name: req.body.name,
      description: req.body.description
    });
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

