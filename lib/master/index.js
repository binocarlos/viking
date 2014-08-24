var http = require('http')
var etcdjs = require('../etcd')
var dockers = require('./dockers')
var Router = require('./router')

module.exports = function(opts){
	opts = opts || {}
	var etcd = etcdjs(opts)
	var docker = dockers(etcd, opts)
	var router = Router(etcd, opts, docker)
	var server = http.createServer(router)
	return {
		start:function(done){
			server.listen(80, done)
		}
	}
}