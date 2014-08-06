var etcdjs = require('etcdjs')

function getEnvConnection(string){
	return (string || process.env.VIKING_MASTERS || '').split(/\s*,\s*/).map(function(master){
		return master.indexOf(':')>0 ? master : master + ':4001'
	})
}
module.exports = function(string){
	var masters = getEnvConnection(string)
	return etcdjs(masters)
}