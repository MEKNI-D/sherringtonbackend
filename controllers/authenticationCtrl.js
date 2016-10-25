/**
 * Created by Donia on 29/06/2016.
 */
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');
var crypto = require('crypto');
var mailer = require("nodemailer");

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "mekni.donia92@gmail.com",
        pass: "h&m10*:p"
    }
});

module.exports.register = function(req, res) {

     /*if(!req.body.name || !req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
       return;
     }*/

    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.first_name= req.body.first_name;
    user.last_name = req.body.last_name;
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.city = req.body.city;
    user.postal_code = req.body.postal_code;
    user.role = req.body.role;
    user.company_name = req.body.company_name;
    user.company_address = req.body.company_address;
    user.company_phone = req.body.company_phone;
    user.save(function(err) {

        if (err){
            res.status(401).json(err+ "could not register");
        }else{
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        }

    });

};

module.exports.login = function(req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    passport.authenticate('local', function(err, user, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }
        // If a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};

module.exports.resetPassword = function(req, res) {
    User.find({email :req.params.email})
        .exec(function(err, user) {
            if(err){
                res.status(401).json(err+ 'Nous n avons trouvé aucun compte qui correspond à cet email');
            }else {
                console.log('success section')
                var password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
                /*var salt = crypto.randomBytes(16).toString('hex');
                user.salt = salt;
                var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64).toString('hex');
                user.hash = hash;*/
                /*user.setPassword(password);*/


                if(user){
                    var newSalt = crypto.randomBytes(16).toString('hex');
                    /*user.salt = salt;*/
                    var newHash = crypto.pbkdf2Sync(password, newSalt, 1000, 64).toString('hex');
                    /*user.hash = hash;*/
                    User.findOneAndUpdate({email : req.params.email}, {$set : {hash : newHash,salt : newSalt }}, function (err, data) {
                        if (err) {
                            res.status(401).json(err);
                            console.log(err);
                        } else {
                            res.status(200).json(data);
                            console.log('update user succeded')
                        }
                    });
                   /* User.findOne({email: req.params.email},function(err,data){
                        data.hash = newHash;
                        data.salt= newSalt;
                        data.save();
                    });*/
                    var mail = {
                        from: 'mekni.donia92@gmail.com',
                        to: req.params.email,
                        subject: 'Réinitialisation de mot de passe _ Sherrington',
                        text: 'Votre nouveau mot de passe est : ' + password + ' Vous pouvez le modifier une fois accédé à vore ' +
                        'espace personnel'

                    };
                    smtpTransport.sendMail(mail, function (error, response) {
                        if (error) {
                            //res.send(error);
                            console.log(user+'innnnnnnnnnn')
                            console.log(req.params.email+'innnnnnnnnnn')
                            console.log(error+'hahahaha')
                        } else {
                            //res.send("Message sent: " + response.message);
                            console.log(response)
                        }

                        smtpTransport.close();
                    });
                }

                console.log(mail.to)


                    /*res.status(200).json(user);*/
                }

        });
};