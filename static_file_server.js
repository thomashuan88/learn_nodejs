var httpUtil = require('http');
var fsUtil = require('fs');
var urlUtil = require('url');

var appConfig = {
	staticPath: __dirname
};

var handleFiles = function(req,res,next) {
	var url = urlUtil.parse(req.url);
	var path = appConfig.staticPath+url.pathname;
	console.log(path);
	fsUtil.exists(path, function(exists){
		if (exists) {
			fsUtil.readFile(path, function(err,data){
				if (err) throw next(err);
				res.end(path+'\n'+data);
			});
		} else {
			next(null);
		}
	});	
};

httpUtil.createServer(function(req,res){
	handleFiles(req,res,function(err){
		if (err) throw err;
		res.statusCode = 404;
		res.end('404 Not Found. Sorry.\n');
	});
}).listen(8000);