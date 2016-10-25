/**
 * Created by Donia on 29/06/2016.
 */
var mongoose = require('mongoose');
var User = require('../models/user');

module.exports.profileRead = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                if(err){
                    res.status(401).json(err+ 'error occurred when fetching profile');
                }else{
                    console.log(req.payload);
                res.status(200).json(user);}
            });
    }

};

