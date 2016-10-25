/**
 * Created by Elkhatib on 30/06/2016.
 */
var mongoose = require("mongoose");
var async = require("async");
var item = require("../models/item");

/* GET shopping cart */
module.exports.getCarts = function (req , res) {
    console.log(req.session);
        res.send(req.session.cart);
};

/* POST add item to shopping cart */
module.exports.addItem  = function (req , res) {
    req.session.cart.push({item :req.body});
    console.log(req.session.cart);
    res.send(req.session.cart);
}
/*module.exports.addItem  = function (req , res) {
    if (req.session.cart.length == 0) {
        async.waterfall([
            function (callback) {
                item.find({_id : req.body.id}).exec(function(err, item){
                    console.log(item);
                    callback(null , item)
                })
            },
            function (item, callback) {
                console.log(req.body.qte);
                console.log(req.session);
                console.log(req.session.cart+'cart empty');
                req.session.cart.qte = req.params.qte;
                req.session.cart.item = item[0];
                //req.session.cart.push({qte : req.body.qte , items : item[0]});
                console.log(req.session.cart+'cart full');
                console.log(req.session.cart.qte+'cart full');
                //callback(null, req.session.cart)
                res.send(req.session.cart);
            }
        ]
        )
    }
    /!**!/
    else
    {
        found = -1 ;

        for(var i=0 ; i<req.session.cart.length ; i++)
        {
            if(req.session.cart[i].items._id == req.body.id)
            {
                found = i ;
                break ;
            }
        }
        if (found !=-1)
        {
            req.session.cart[i].qte= parseInt(req.body.qte) +parseInt(req.session.cart[i].qte) ;
            res.send(req.session.cart);
        }
        else
        {
            async.waterfall([

                function (callback) {
                    item.find({_id : req.body.id}).exec(function(err, item){

                        callback(null , item)

                    })
                },
                function (item, callback) {
                    req.session.cart.push({qte : req.body.qte , items : item[0]});

                    res.send(req.session.cart)
                }
            ])
        }
    }

}*/

module.exports.editQte = function (req, res) {
    found = -1 ;
    for(var i=0 ; i<req.session.cart.length ; i++) {
        if(req.session.cart[i].items._id == req.params.id) {
            found = i ;
            break ;
        }
    }
    if (found !=-1) {
        req.session.cart[i].qte= parseInt(req.params.qte) +parseInt(req.session.cart[i].qte) ;
        res.send(req.session.cart);
    }
};

module.exports.deleteItem = function (req, res) {
    found = -1 ;
    for(var i=0 ; i<req.session.cart.length ; i++) {
        if(req.session.cart[i].items._id == req.params.id) {
            found = i ;
            break ;
        }
    }
    if (found !=-1) {
        req.session.cart.splice(found, 1) ;
        res.send(req.session.cart);
    }
};

