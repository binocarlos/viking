module.exports = function(etcd, opts){
	return function(req, res){
		console.dir(opts)
		res.end('ok')
	}
}