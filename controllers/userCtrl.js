/**
 * Created by Donia on 14/07/2016.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var crypto = require('crypto');
var User = require('../models/user.js');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
/* GET all users  */
module.exports.getAllUsers = function(req, res) {

    User.find({}).exec(function(err, users){
        if(err) {console.log("success section");
            res.json({error: err});
        }else {
            console.log("success section");
        res.json(users);}

    });

};

/* GET all users  */
module.exports.getSingleUser = function(req, res) {

    User.find({_id : req.params.id}).exec(function(err, user){
        if(err) {console.log("success section");
            res.json({error: err});
        }else {
            console.log("success section");
            res.json(user); }
    });

};
/* Activate user account  */
module.exports.activateUser = function(req, res) {

    User.update({_id : req.params.id},{$set : {status : "active"}}, function(err, user){

        if(err){res.json(err);
            console.log("error section"+err);
        }else{
        console.log("success section");
        res.json(user);}
    });

};

/* Ban user account  */
module.exports.banUser = function(req, res) {

    User.update({_id : req.params.id},{$set : {status : "banned"}}, function(err, user){
        console.log("document edited");
        if(err){res.send(error)};
        res.json(user);
    });

};

/* Edit user account  */
module.exports.editUser = function(req, res) {

    User.find({_id : req.body._id},function(err, user){
        if(err) {console.log("error find section");
            res.json({error: err});
        }else {
            console.log("success find section");
            user = req.body;
            if(req.body.password!=null){
                var newSalt = crypto.randomBytes(16).toString('hex');
                var newHash = crypto.pbkdf2Sync(req.body.password, newSalt, 1000, 64).toString('hex');
                user.salt = newSalt;
                user.hash = newHash;
            }

           User.update({_id: req.body._id}, user, function (err, response) {
               if(err){
                   res.json(err);
               }else {
                   res.json(response);
               }

           });

             }
    });
    };

/* Delete user account */
module.exports.deleteUser = function(req, res) {

    var user = User.findByIdAndRemove(req.params.id, function(err, user){
        console.log("user deleted");
    });
    res.status(200).send('user deleted');

};


