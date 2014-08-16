var etcdjs = require('etcdjs')
function etcdArray(args){
	var masters = args.masters || ''
	return masters.split(/\s*,\s*/).map(function(master){
		return master + ':' + args.etcdport
	})
}
module.exports = function(args){
	return etcdjs(etcdArray(args))
}