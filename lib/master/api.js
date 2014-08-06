module.exports = function(etcd, opts){
	return function(req, res){
		res.end(JSON.stringify(opts, null, 4))
	}
}