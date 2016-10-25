/**
 * Created by RihabK on 23/06/2016.
 */
var mongoose = require('../config/db.js');

var Schema = mongoose.Schema;
var Category = new Schema({
    name: String,
    description: String,
    status: String,
    image: String,
    sub_categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'sub_category'}]

});
module.exports = mongoose.model('Category', Category);
