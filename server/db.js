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
var User = sequelize.import('./models/user')
module.exports = sequelize;

//build a user model in sqllize