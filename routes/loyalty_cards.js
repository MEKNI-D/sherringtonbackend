/**
 * Created by RihabK on 29/06/2016.
 */

var express = require('express');
var router = express.Router();
var ctrlLoyaltyCard = require('../controllers/loyalty_cardCtrl.js');


/* GET all LoyaltyCards  */
router.get('/', ctrlLoyaltyCard.getAllLoyaltyCards);

/* GET LoyaltyCard by ID */
router.get('/:id', ctrlLoyaltyCard.getLoyaltyCardById);

/* GET LoyaltyCard by User */
router.get('/:idUser', ctrlLoyaltyCard.getLoyaltyCardByUser);

/* Edit a loyaltyCard */
router.post('/edit/:id',ctrlLoyaltyCard.EditLoyaltyCard);

/* DELETE Loyalty_card  */
router.get('/delete/:id',ctrlLoyaltyCard.DeleteLoyaltyCard);

module.exports = router;