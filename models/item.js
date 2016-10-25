/**
 * Created by Donia on 23/06/2016.
 */
var mongoose = require('../config/db.js');
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose);
var ItemSchema = mongoose.Schema({
    name: String,
    ref: String,
    desc: String,
    size: [String],
    color: [String] ,
    tags: [String] ,
    stock : Number,
    sold_out: {
        type: Boolean,
        default: false
    },
    disponibility : String,
    price: Number,
    new : Boolean,
    promo : Boolean,
    promo_amount: Number,
    first_picture : String,
    second_picture : String,
    third_picture : String,
    fourth_picture : String,
    _category : {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    _sub_category: {type: mongoose.Schema.Types.ObjectId, ref: 'sub_category'}
});

/*ItemSchema.plugin(autoIncrement.plugin, "Item");*/
module.exports = mongoose.model('Item', ItemSchema);
