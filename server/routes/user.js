var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req,res){

	var username = req.body.user.username;
	var pass = req.body.user.password;
	User.create({
		username: username,
		passwordhash : bcrypt.hashSync(pass, 10)
	}).then(
			//Sequelize is going to return the object it created from the db.
			function createSuccess(user){

				var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

				res.json({
					user: user,
					//why do we need two created messages?
					message: 'created',
					sessionToken: token
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
	//Need to create a user object and use Sequelize to put that user into our database
});
module.exports = router;
