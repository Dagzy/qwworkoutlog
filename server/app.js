var express = require('express');
var app = express();
//./middleware/headers? This directory doesn't look correct. Append .js to path?
app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on port 3000");
});