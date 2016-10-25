var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profileCtrl');
var ctrlAuth = require('../controllers/authenticationCtrl');
var ctrlUser = require('../controllers/userCtrl');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

//reset password

router.get('/resetPassword/:email', ctrlAuth.resetPassword);
// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/', ctrlUser.getAllUsers);
router.get('/:id', ctrlUser.getSingleUser);
router.get('/activate/:id', ctrlUser.activateUser);

router.get('/ban/:id', ctrlUser.banUser);
router.post('/edit', ctrlUser.editUser);
router.get('/delete/:id', ctrlUser.deleteUser);

module.exports = router;

