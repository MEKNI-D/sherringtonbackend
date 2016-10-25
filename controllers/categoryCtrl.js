/**
 * Created by RihabK on 29/06/2016.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
var Category = require('../models/category.js');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
/* GET all categories  */
module.exports.getAllCategories = function(req, res) {

    Category.find({}).populate("sub_category").exec(function (err , succ) {
        if(err)
        {res.send(err);}
        else {
            res.send (succ);
        }
    });

};
/* GET category by ID */
module.exports.getCategoryById = function(req, res) {
    Category.find({ _id : req.params.id }, function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
    });
};
/* Upload category picture */
module.exports.postSingleCategory = function(req, res) {
    var id = req.params.id;
    var fileName;
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads');
        },
        filename: function (req, file, callback) {
            fileName = id + '-' + file.originalname;
            callback(null, id + '-' + file.originalname);
        }
    });
    var upload = multer({ storage : storage}).single('userPhoto');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        else {
            item.find({_id: req.params.id}, function (err, ground) {
                var query = {_id: req.params.id};
                item.update(query, {picture: fileName}, function () {
                    res.redirect('/categories/' + req.params.id);
                });
            });
        }
    });
};

/* ADD new category  */
module.exports.AddCategory = function(req, res) {
    new Category({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        image: req.body.image,
        sub_categories: req.body.sub_categories
    })
        .save(function (err, response) {
            if(err){res.json(err);}
            else {
                res.json(response);
            }
        });
};

/* Edit a category */
module.exports.EditCategory= function (req, res) {
    Category.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data){
        res.json(data);
    });
};
/* DELETE category  */
module.exports.DeleteCategory = function(req, res) {
    Category.remove({ _id : req.params.id }, function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
    });
};