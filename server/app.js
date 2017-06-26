var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db')
var User = sequelize.import(__dirname +'\\models\\user');

User.sync();  //User.sync({ force: true }); WARNING: THIS WILL DROP A TABLE!

//./middleware/headers? This directory doesn't look correct. Append .js to path?

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/api/login', require('./routes/session'));
app.use('/api/user', require('./routes/user'));
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on port 3000");
});
