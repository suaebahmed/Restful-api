const router = require('express').Router();
const Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controllers/orders')

router.get('/',checkAuth, OrderController.orders_get_all);
router.post('/',checkAuth, OrderController.createA_newOrder);
router.get('/:productID',checkAuth, OrderController.get_a_order)
router.delete('/:id',checkAuth, OrderController.delete_a_order);

module.exports = router
