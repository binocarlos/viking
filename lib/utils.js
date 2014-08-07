module.exports.serverPath = function(){
	return process.env.VIKING_ETCD_PATH + '/server/'
}

module.exports.networkPath = function(){
	return process.env.VIKING_ETCD_PATH + '/network/'
}

function defaultAlias(){
	return {
		'ip':'i',
		'masters':'m',
		'hostname':'h',
		'dockerport':'dp',
		'masterport':'mp',
		'etcdpath':'ep'
	}
}

function defaultDefault(){
	return {
		'ip':process.env.VIKING_IP,
		'masters':process.env.VIKING_MASTERS,
		'hostname':process.env.HOSTNAME,
		'dockerport':process.env.DOCKER_PORT || 2375,
		'masterport':process.env.VIKING_MASTER_PORT || 8791,
		'etcdport':process.env.VIKING_ETCD_PORT || 4001,
		'etcdpeerport':process.env.VIKING_ETCD_PEERPORT || 7001,
		'etcdpath':process.env.VIKING_ETCD_PATH || '/viking'
	}
}

module.exports.getArgs = function(alias, defs){
	var fullAlias = defaultAlias()
	var fullDefault = defaultDefault()
	Object.keys(alias || {}).forEach(function(key){
		fullAlias[key] = alias[key]
	})
	Object.keys(defs || {}).forEach(function(key){
		fullDefault[key] = defs[key]
	})
	var args = require('minimist')(process.argv, {
		alias:fullAlias,
		default:fullDefault
	})
	if(!args.hostname){
		console.error('HOSTNAME or --hostname variable required')
		process.exit(1)
	}
	if(!args.ip){
		console.error('VIKING_IP or --ip variable required')
		process.exit(1)
	}
	if(!args.masters){
		console.error('VIKING_MASTERS or --masters variable required')
		process.exit(1)
	}
	return args
}