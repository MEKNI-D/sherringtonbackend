/**
 * Created by RihabK on 29/06/2016.
 */
var mongoose = require('mongoose');

var Loyalty_card = require('../models/loyalty_card');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
/* GET all LoyaltyCards  */
module.exports.getAllLoyaltyCards = function(req, res) {

    Loyalty_card.find(function(err, list) {
        if (err) {
            console.log(err);
        } else {
            console.log(list);
            res.json(list);
        }

    });

};
/* GET LoyaltyCard by ID */
module.exports.getLoyaltyCardById = function(req, res) {
    Loyalty_card.find({ _id : req.params.id }, function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
    });
};

/* GET LoyaltyCard by User */
module.exports.getLoyaltyCardByUser = function(req, res) {
    Loyalty_card.find({ user_id : req.params.id }, function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
    });
};

/* Edit a loyaltyCard */
module.exports.EditLoyaltyCard= function (req, res) {
    Loyalty_card.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data){
        res.json(data);
    });
};

/* DELETE Loyalty_card  */
module.exports.DeleteLoyaltyCard = function(req, res) {
    Loyalty_card.remove({ _id : req.params.id }, function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
    });
};