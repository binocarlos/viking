var http = require('http')
var etcdjs = require('../etcd')
var locker = require('./lock')
var leaderProxy = require('./leaderproxy')
var dockerMesh = require('./dockermesh')
var Router = require('./router')

module.exports = function(opts){
	opts = opts || {}
	var etcd = etcdjs(opts)
	var lock = locker(etcd, opts)
	var proxy = leaderProxy(lock, opts)
	var docker = dockerMesh(etcd, opts)
	var router = Router(etcd, opts, docker)
	var server = http.createServer(proxy(router))
	
	return {
		start:function(done){
			lock.start()
			server.listen(80, done)
		}
	}
}