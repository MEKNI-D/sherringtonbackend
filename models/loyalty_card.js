/**
 * Created by RihabK on 23/06/2016.
 */
var mongoose = require('../config/db.js');

var Schema = mongoose.Schema;
var Loyalty_card = new Schema({
    points: Number,
    user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user'}

});
module.exports = mongoose.model('Loyalty_card', Loyalty_card);
