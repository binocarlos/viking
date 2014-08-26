// hit cadvisor for each endpoint provided and pick the one
// with most memory % free
var async = require('async')
var hyperquest = require('hyperquest')

function loadSingleHostJobs(endpoint, done){

}

function loadAllHostJobs(endpoint, done){

}

function loadSingleHostInfo(endpoint, done){

}

function loadAllHostInfo(backends, done){

}

module.exports = function(backends, done){

	backends = Object.keys(backends || {}).map(function(key){
		return backends[key]
	})

	async.parallel({
		host:function(next){

		},
		jobs:function(next){

		}

	})

	// loop over each server and get a list of job ids
	async.map(backends, function(backend, nextBackend){

		var ip = backend.docker.split(':')[0]


		nextBackend(null, {
			backend:backend,
			stats:{}
		})
	}, function(err, stats){

	})
}