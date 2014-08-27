var advisor = require('cluster-advisor')

module.exports = function(servers, done){

	var serverMap = {}

	servers = Object.keys(servers || {}).map(function(key){
		var server = servers[key]
		var cadvisor = server.docker.split(':')[0] + ':8085'
		serverMap[cadvisor] = key
		return cadvisor
	})

	var cluster = advisor(servers)
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

		var choosenServerKey = serverMap[mostBackend]
		var choosenServer = servers[choosenServerKey]
		done(null, choosenServer)
	})
}