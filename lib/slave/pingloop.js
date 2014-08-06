var utils = require('../utils')

module.exports = function(etcd, data, opts){
	opts = opts || {}
	var isActive = false
	var currentTimeout = null
	var ttl = opts.ttl || 10
	function nextLoop(){
		if(!isActive) return
		etcd.set(utils.serverPath() + process.env.HOSTNAME + '/active', 'yes', {
			ttl:ttl
		}, done)
		currentTimeout = setTimeout(nextLoop, (ttl/2) * 1000)
	}
	return {
		register:function(done){
			etcd.set(utils.serverPath() + process.env.HOSTNAME + '/meta', JSON.stringify(data, null, 4), done)
		},
		start:function(done){
			isActive = true
			nextLoop()
			done()
		},
		stop:function(done){
			isActive = false
			clearTimeout(currentTimeout)
			done()
		}
	}
}