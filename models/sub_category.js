/**
 * Created by RihabK on 23/06/2016.
 */
var mongoose = require('../config/db.js');

var Schema = mongoose.Schema;
var Sub_category = new Schema({
    name: String,
    description: String,
    image: String,
    _category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'} ,
    items : {type: mongoose.Schema.Types.ObjectId, ref: 'item'}

});
module.exports = mongoose.model('Sub_category', Sub_category);
