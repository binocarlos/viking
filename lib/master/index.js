var http = require('http')
var etcdjs = require('../etcd')
var masterProxy = require('./proxy')

module.exports = function(opts){
	opts = opts || {}
	var etcd = etcdjs(opts.etcd)
	var proxy = masterProxy(etcd, opts)
	var server = http.createServer(proxy(function(res, res){
		res.end('ok')
	}))
	return {
		start:function(done){
			proxy.start()
			server.listen(8080, done)
		}
	}
}