module.exports = function(opts){
	var tags = opts.tags || process.env.VIKING_TAGS || []
	if(typeof(tags)=='string'){
		tags = tags.split(/\s*,\s*/)
	}
	return {
		hostname:process.env.HOSTNAME,
		ip:process.env.VIKING_IP,
		tags:tags
	}
}