/**
 * Created by Donia on 24/10/2016.
 */
var mongoose = require('mongoose');
var contact = require('../models/contact');
var mailer = require("nodemailer");

/*var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "mekni.donia92@gmail.com",
        pass: "h&m10*:p"
    }
});*/

var smtpTransport = mailer.createTransport('direct', {
        debug: true, //this!!!
    });

/* GET all messages */
module.exports.allMessages = function(req, res) {
    contact.find(function (err, messages) {
        if(err){res.json(err);}
        else {res.json(messages);}
    });
};


/* GET Message by ID */
module.exports.getSingleMessage = function(req, res) {
    contact.find({ _id : req.params.id }, function (err, msg) {
        if(err){res.json(err);}
        else {res.json(msg);}
    });
};

/* POST new message */
module.exports.sendMessage = function (req, res) {

    var msg = new contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        subject : req.body.subject,
        message : req.body.message
    });

    msg.save(function (err, response) {
        if(err){res.json(err);}
        else {
            var mail = {
                from: req.body.email,
                to: 'mekni.donia92@gmail.com',
                subject: req.body.subject,
                text: req.body.message

            };
            smtpTransport.sendMail(mail, function (error, response) {
                if (error) {
                    //res.send(error);

                    console.log(req.body.email+'innnnnnnnnnn')
                    console.log(error+'hahahaha')
                } else {
                    //res.send("Message sent: " + response.message);
                    console.log(response)
                }

                smtpTransport.close();
            });
        }
    });







};