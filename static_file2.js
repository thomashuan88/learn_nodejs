var connect = require('connect');

var appConfig = {
	staticPath: __dirname;
};

var app = connect()
	.use(connect.static(appConfig.staticPath))
	.use(function(req,res,nex){
		res.statusCode = 404;
		res.end('404 Not Found. Sorry.\n');
	})
	.listen(8000);