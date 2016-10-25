/**
 * Created by Donia on 23/06/2016.
 */
var mongoose = require('../config/db.js');

var OrderSchema = mongoose.Schema({
    order_number : Number,
    items_number: Number,
    total_price: Number,
    status: String,
    ship_to: String,
    governorate: String,
    shipment_date: Date,
    ordered : Number,
    _user : {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('Order', OrderSchema);
