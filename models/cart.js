/**
 * Created by RihabK on 23/06/2016.
 */
var mongoose = require('../config/db.js');

var Schema = mongoose.Schema;
var Cart = new Schema({
    scid: String,
    total_price: Number,
    qte: Number,
    status: String,
    creation_date: { type: Date, default: Date.now },
    items : [{type: mongoose.Schema.Types.ObjectId, ref: 'Line_item'}],
    user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user'}

});
module.exports = mongoose.model('Cart', Cart);
