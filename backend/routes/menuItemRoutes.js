const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');


router.get('/menu/:menuId', menuItemController.getMenuItemsByMenu);
router.get('/:id', menuItemController.getMenuItem);
router.post('/', menuItemController.createMenuItem);


module.exports = router; 