/**
 * Created by Donia on 27/06/2016.
 */
var express = require('express');
var router = express.Router();

var orderCtrl = require('../controllers/orderCtrl');


/* GET all orders */
router.get('/', orderCtrl.allOrders );

/* GET Order by ID */

router.get('/:id', orderCtrl.getSingleOrder);

/* GET Order by user ID */

router.get('/user/:user', orderCtrl.getUserOrders);

/* POST new Order */

router.post('/', orderCtrl.addOrder);

/* Edit an existing Order */

router.post('/edit/:id', orderCtrl.editOrder);

/* Delete an Order */

router.get('/delete/:id', orderCtrl.deleteOrder);

module.exports = router;