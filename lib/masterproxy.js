var http = require('http')
var masterProxy = require('http-master-proxy')
var locked = require('locked')

module.exports = function(etcd, opts){
	var locker = locked(etcd)
	var key = (opts.key || '/viking') + '/master'
	var node = locker({
		id:process.env.HOSTNAME,
		path:key,
		value:process.env.VIKING_IP,
		ttl:10
	})
	
}