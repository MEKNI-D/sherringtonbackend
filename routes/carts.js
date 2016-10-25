/**
 * Created by Elkhatib on 30/06/2016.
 */
var express = require('express');
var router = express.Router();

var cartCtrl = require('../controllers/cartCtrl');

router.get("/",cartCtrl.getCarts );
router.post("/add",cartCtrl.addItem );
router.put("/:id/:qte",cartCtrl.editQte );
router.delete("/:id" , cartCtrl.deleteItem)

module.exports = router ;
