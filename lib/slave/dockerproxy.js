module.exports = function(opts){

	var dockerip = 'http://' + opts.ip + ':' + opts.dockerport

	return function(req, res){
		var proxy = hyperquest('http://' + address + req.url, {
			method:req.method,
			headers:req.headers
		})
		if(req.method=='GET'||req.method=='DELETE'){
			proxy.pipe(res)
		}
		else{
			req.pipe(proxy).pipe(res)
		}
		proxy.on('error', function(err){
			res.statusCode = 500
			res.end(err)
		})
	}
	
}