var pingloop = require('./pingloop')
var slaveinfo = require('./slaveinfo')
var etcdjs = require('../etcd')

module.exports = function(opts){
	opts = opts || {}
	var etcd = etcdjs(opts.etcd)
	var loop = pingloop(etcd, slaveinfo(opts), opts)
	return {
		start:function(done){
			loop.register(function(err){
				loop.ping()
			})
		}
	}
}