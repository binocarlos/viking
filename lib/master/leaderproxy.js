var masterProxy = require('http-master-proxy')
module.exports = function(lock, opts){
	return masterProxy(function(){
		return lock.isSelected()
	},function(){
		return lock.value()
	})
}