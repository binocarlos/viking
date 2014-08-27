var advisor = require('cluster-advisor')

module.exports = function(servers, done){

	var serverMap = {}

	var cadvisors = Object.keys(servers || {}).map(function(key){
		var server = servers[key]
		var ip = server.docker.split(':')[0]
		var cadvisor = ip + ':8085'
		serverMap[ip] = key
		return cadvisor
	})

	var cluster = advisor(cadvisors)
	cluster.stats(function(err, stats){
		if(err) return done(err)

		// return the server with the mostest % memory (innit)
		var mostMemory = null
		var mostBackend = null
		stats.forEach(function(server){
			var percentUsed = 1-(server.memoryused / server.memorytotal)
			if(mostMemory===null || percentUsed>mostMemory){
				mostMemory = percentUsed
				mostBackend = server.backend
			}
		})

		var ip = mostBackend.split(':')[0]
		var hostname = serverMap[ip]
		done(null, servers[hostname])
	})
}