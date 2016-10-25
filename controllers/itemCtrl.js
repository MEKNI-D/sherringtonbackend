var mongoose = require("mongoose")

var item = require("../models/item");

module.exports.addItem = function (req, res)
{
    var product = new item(
        {
            name: req.body.name,
            ref: req.body.ref,
            desc: req.body.desc,
            size: ["M", "XL", "XLL"],
            color: ["RED", "Black"] ,
            tags: ["Tag1", "Tag2"] ,
            stock : req.body.stock,
            price: req.body.price,
            disponibility : req.body.disp,
            new : req.body.new,
            promo : req.body.promo,
            promo_amount: req.body.promo_amount,
            first_picture : req.body.first_picture,
            second_picture : req.body.second_picture,
            third_picture : req.body.third_picture,
            fourth_picture : req.body.fourth_picture,
            _category : req.body._category/*,
            _sub_category: req.body._sub_cateogory */
        }
    );
    product.save(function (err, succ) {
       if (err) {res.json(err);
           console.log(err);
       }else{
           res.json(succ);}
    })
};


module.exports.getAll = function (req, res) {
    item.find({}).populate("_category").exec(function (err , succ) {
     if(err)
     {res.send(err);}
    else {
         res.send (succ);
     }
});
};

module.exports.getById = function (req, res) {
    item.find({_id: req.params.id}).populate("_category").exec(function (err,succ) {
        if(err) {res.send(err);
        }else {
            res.send(succ[0]);}
    });

}




