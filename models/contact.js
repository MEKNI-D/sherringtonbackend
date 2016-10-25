/**
 * Created by Elkhatib on 23/06/2016.
 */

var mongoose = require('../config/db');
var ContactSchema = mongoose.Schema(
    {
       first_name : String ,
        last_name : String,
        email : String,
        subject: String,
        message: String,
    }

);
module.exports = mongoose.model("Contact", ContactSchema );
