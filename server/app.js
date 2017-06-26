var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//./middleware/headers? This directory doesn't look correct. Append .js to path?
app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on port 3000");
});


var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'Letmein1234!', {
	host : 'localhost',
	dialect : 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);

	}
);
//build a user model in sqllize
var User = sequelize.define('user',{
	username: Sequelize.STRING,
	//HEY WHAT ABOUT THIS COMMA AT THE END OF THE CALLBACK?!
	passwordhash : Sequelize.STRING,
});
User.sync();
//User.sync({ force: true });
app.use(bodyParser.json());
app.post('/api/user', function(req,res){
	var username = req.body.user.username;
	var pass = req.body.user.password;
	User.create({
		username: username,
		passwordhash : ''
	}).then(
			//Sequelize is going to return the object it created from the db.
			function createSuccess(user){
				res.json({
					user: user,
					message: 'create'
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
	//Need to create a user object and use Sequelize to put that user into our database
});

