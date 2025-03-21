const MenuItem = require('../models/MenuItem');
const Menu = require('../models/Menu');



exports.getMenuItemsByMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ menu: req.params.menuId });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('menu');
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const menu = await Menu.findById(req.body.menuId);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    const menuItem = new MenuItem({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      menu: req.body.menuId
    });

    const newMenuItem = await menuItem.save();
    
    menu.items.push(newMenuItem._id);
    await menu.save();

    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

