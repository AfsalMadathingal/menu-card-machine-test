const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenu);
router.post('/', menuController.createMenu);


module.exports = router; 