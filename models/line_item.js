/**
 * Created by RihabK on 23/06/2016.
 */
var mongoose = require('../config/db.js');

var Schema = mongoose.Schema;
var Line_item = new Schema({
    _item: {type: mongoose.Schema.Types.ObjectId, ref: 'item'},
    _cart: {type: mongoose.Schema.Types.ObjectId, ref: 'cart'},
    qte: Number
});
module.exports = mongoose.model('Line_item', Line_item);

