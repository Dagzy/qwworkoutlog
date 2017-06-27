require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');

var User = sequelize.import('./models/user');

//User.sync();  //User.sync({ force: true }); WARNING: THIS WILL DROP A TABLE!
//Comment out and comment out and comment out and comment out
//./middleware/headers? This directory doesn't look correct. Append .js to path?
sequelize.sync();

app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));


app.use('/api/test', function(req, res){
	res.send('Hello World');
});

app.listen(3000, function(){
	console.log('app is listening on port 3000');
});