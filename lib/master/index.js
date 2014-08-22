var http = require('http')
var etcdjs = require('../etcd')
var locker = require('./lock')
var leaderProxy = require('./leaderproxy')
var dockers = require('./dockers')
var Router = require('./router')

module.exports = function(opts){
	opts = opts || {}
	var etcd = etcdjs(opts)

	// driving the master lock
	var lock = locker(etcd, opts)

	// redirect POST,PUT,DELETES to the elected master
	var proxy = leaderProxy(lock, opts)

	// the docker controller for the cluster
	var docker = dockers(etcd, opts)

	// the router is top level api version controller
	// if not api version then docker controller
	var router = Router(etcd, opts, docker)

	var server = http.createServer(proxy(router))
	
	return {
		start:function(done){
			lock.start(function(){
				server.listen(80, done)	
			})
		}
	}
}