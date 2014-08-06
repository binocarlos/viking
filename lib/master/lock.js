var locked = require('locked')
module.exports = function(etcd, opts){
	var locker = locked(etcd)
	var key = opts.etcdpath + '/masterlock'
	var node = locker({
		id:opts.hostname,
		path:key,
		value:opts.ip + ':' + opts.masterport,
		ttl:opts.ttl || 10
	})
	return node
}