var express = require('express');
var router = express.Router();

var contactCtrl = require('../controllers/contactCtrl');


/* GET all messages */
router.get('/', contactCtrl.allMessages );

/* GET Message by ID */

router.get('/:id', contactCtrl.getSingleMessage);


/* POST new message */

router.post('/', contactCtrl.sendMessage);


module.exports = router;