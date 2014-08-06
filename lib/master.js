var http = require('http')
var etcdjs = require('./etcd')
var masterProxy = require('./masterproxy')

module.exports = function(opts){
	opts = opts || {}
	var etcd = etcdjs(opts.etcd)
	var proxy = masterProxy(etcd, opts)
	var server = http.createServer(proxy(function(res, res){

	}))
	return {
		start:function(done){
			done()
		}
	}
}