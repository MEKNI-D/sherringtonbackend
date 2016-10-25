/**
 * Created by Donia on 23/06/2016.
 */
var express = require('express');
var router = express.Router();

var itemCtrl = require('../controllers/itemCtrl');

/*
/* POST new Item */

router.post('/', itemCtrl.addItem);

router.get("/", itemCtrl.getAll);
router.get("/:id", itemCtrl.getById)

module.exports = router;