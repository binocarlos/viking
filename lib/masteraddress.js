function masterArray(args){
	var masters = args.masters || ''
	return masters.split(/\s*,\s*/).map(function(master){
		return master + ':' + args.masterport
	})
}
module.exports = function(args){
	return masterArray(args)
}