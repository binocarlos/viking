module.exports = function(opts){
	return {
		hostname:process.env.HOSTNAME,
		ip:process.env.VIKING_IP,
		tags:opts.tags || process.env.VIKING_TAGS
	}
}