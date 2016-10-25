/**
 * Created by Donia on 29/06/2016.
 */
var mongoose = require('mongoose');
var order = require('../models/order');
var user = require('../models/user');

/* GET all orders */
module.exports.allOrders = function(req, res) {
    order.find(function (err, items) {
        if(err){res.json(err);}
        else {res.json(items);}
    });
};

/* GET Item by ID */
module.exports.getSingleOrder = function(req, res) {
    order.find({ _id : req.params.id }, function (err, item) {
        if(err){res.json(err);}
        else {res.json(item);}
    });
};

/* GET Item by ID */
module.exports.getUserOrders = function(req, res) {
    order.find({ _user : req.params.user }, function (err, orders) {
        if(err){res.json(err);}
        else {res.json(orders);}
    });
};

/* POST new order */
module.exports.addOrder = function (req, res) {

    var o = new order({ items_number: req.body.items_number,
        total_price: req.body.total_price,
        status: 'pending',
        ship_to: req.body.ship_to,
        governorate: req.body.governorate,
        shipment_date: req.body.shipment_date,
        ordered : 0,
        _user : req.body._user});
        /*u._orders.push(o);*/
    o.save(function (err, response) {
        if(err){res.json(err);}
        else {
            res.json(response);
        }
    });



};

/* Edit an existing order */
module.exports.editOrder = function (req, res) {
    order.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data){
        res.json(data);
    });
};

/* Delete an order */
module.exports.deleteOrder = function (req, res) {
    order.remove({ _id : req.params.id }, function (err, data) {
        if(err){res.json(err);}
        else {res.send("order deleted");}
    });
};