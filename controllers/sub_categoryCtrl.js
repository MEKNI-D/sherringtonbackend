/**
 * Created by RihabK on 29/06/2016.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
var SubCategory = require('../models/sub_category.js');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
/* GET all Subcategories  */
module.exports.getAllSubCategories = function(req, res) {

    SubCategory.find({}).populate("_category").exec(function (err , succ) {
        if(err)
        {res.send(err);}
        else {
            res.send (succ);
        }
    });

};
/* GET SubCategory by ID */
module.exports.getSubCategoryById = function(req, res) {
    SubCategory.find({ _id : req.params.id }, function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
    });
};
/* Upload Subcategory picture */
module.exports.postSingleSubCategory = function(req, res) {
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
            SubCategory.find({_id: req.params.id}, function (err, ground) {
                var query = {_id: req.params.id};
                SubCategory.update(query, {picture: fileName}, function () {
                    res.redirect('/sub_categories/' + req.params.id);
                });
            });
        }
    });
};

/* ADD new subcategory  */
module.exports.AddSubCategory = function(req, res) {
    new SubCategory({
        name: req.body.name,
        description: req.body.description,
        image: req.body.status,
        _category: req.body._category,
        items: null,
    })
        .save(function (err, response) {
            if(err){res.json(err);
            console.log(err);}
            else {
                res.json(response);
            }
        });
};

/* Edit a subcategory */
module.exports.EditSubCategory= function (req, res) {
    SubCategory.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data){
        res.json(data);
    });
};
/* DELETE subcategory  */
module.exports.DeleteSubCategory = function(req, res) {
    SubCategory.remove({ _id : req.params.id }, function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
    });
};
