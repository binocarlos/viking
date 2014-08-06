module.exports.serverPath = function(){
	return process.env.VIKING_ETCD_PATH + '/server/'
}

module.exports.networkPath = function(){
	return process.env.VIKING_ETCD_PATH + '/network/'
}