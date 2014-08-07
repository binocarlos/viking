module.exports = function(opts){
	var tags = opts.tags || process.env.VIKING_TAGS || []
	if(typeof(tags)=='string'){
		tags = tags.split(/\s*,\s*/)
	}
	return {
		test:20,
		hostname:opts.hostname,
		ip:opts.ip,
		masters:opts.masters,
		masterport:opts.masterport,
		dockerport:opts.dockerport,
		etcdport:opts.etcdport,
		etcdpeerport:opts.etcdpeerport,
		etcdpath:opts.etcdpath,
		tags:tags
	}
}