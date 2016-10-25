/*var mongoose = require( 'mongoose' );*/
var mongoose = require('../config/db.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    first_name: String,
    last_name: String,
    birthdate: Date,
    phone: Number,
    address: String,
    city: String,
    postal_code: Number,
    picture: {
        type: String,
        default: 'assets/img/user.png'
    },
    credit_card: String,
    joining_date: { type: Date, default: Date.now },

    role: {
        type: String,
        enum: ['admin', 'customer', 'business'],
        default: 'customer'
    },
    status: {
        type: String,
        enum: ['active', 'banned'],
        default: 'active'
    },
    pro : Boolean,
    company_name: String,
    company_address: String,
    company_phone: Number,
    _cart_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'cart'}],
    _orders : [{type: mongoose.Schema.Types.ObjectId, ref: 'order'}]
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema);
/*
mongoose.model('User', userSchema);
*/
