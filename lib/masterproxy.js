var http = require('http')
var masterProxy = require('http-master-proxy')
var locked = require('locked')

module.exports = function(etcd, opts){
	var locker = locked(etcd)
	var key = (opts.key || '/viking') + '/masterlock'
	var node = locker({
		id:process.env.HOSTNAME,
		path:key,
		value:process.env.VIKING_IP + ':' + process.env.VIKING_MASTER_PORT,
		ttl:10
	})
	var proxy = masterProxy(function(){
		return node.isSelected()
	},function(){
		return node.value()		
	})
	return proxy
}