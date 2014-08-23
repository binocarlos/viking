function envVolumesFrom(env){
	return env.filter(function(env){
		return env.indexOf('VIKING_VOLUMEFROM_')==0
	}).map(function(env){
		return env.split('=')[1]
	})
}

function envLinks(env){
	return env.filter(function(env){
		return env.indexOf('VIKING_LINK_')==0
	}).map(function(env){
		return env.split('=')[1]
	})
}

function getExposedTCPPorts(container){
	var ports = {}
	Object.keys(container.ExposedPorts || {}).forEach(function(key){
		var parts = key.split('/')
		if(parts[1]=='tcp'){
			ports[parts[0]] = true
		}
	})
	return Object.keys(ports)
}

function serviceName(jobname){
	var parts = jobname.split('.')
	return parts[0]
}

function envName(jobname){
	var name = serviceName(jobname)
	name = name.replace(/\-/g, '_')
	return name.toUpperCase()
}

module.exports = {

	// extract the VIKING_VOLUMEFROM_'s from some env vars
	envVolumesFrom:envVolumesFrom,

	// extract the VIKING_LINK_'s from some env vars
	envLinks:envLinks,

	// study the container and image def to get the exposed ports between them
	getExposedTCPPorts:getExposedTCPPorts,

	serviceName:serviceName,

	envName:envName

}