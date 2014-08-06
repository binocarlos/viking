var http = require('http')
var etcdjs = require('../etcd')
var locker = require('./lock')
var masterProxy = require('./proxy')
var Router = require('./api')

module.exports = function(opts){
	opts = opts || {}
	var etcd = etcdjs(opts.etcd)
	var lock = locker(etcd, opts)
	var proxy = masterProxy(lock, opts)
	var router = Router(etcd, opts)
	var server = http.createServer(proxy(router))
	return {
		start:function(done){
			lock.start()
			server.listen(80, done)
		}
	}
}