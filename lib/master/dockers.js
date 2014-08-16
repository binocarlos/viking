var flocker = require('flocker')
var flockercache = require('flocker-cache')
var flatten = require('etcd-flatten')
var Inventory = require('./inventory')

module.exports = function(etcd, opts){
	var dockers = flocker()
	var inventory = Inventory(etcd, opts)

	dockers.on('request', function(req, res){
		
	})

	dockers.on('list', function(next){
		inventory.list(function(err, servers){
			if(err) return next(err)
			next(null, servers)
		})
	})

	dockers.on('route', flockercache(function(info, next){
		console.log('-------------------------------------------');
		console.log('route')
		next()
	}))

	dockers.on('map', function(name, container, image, next){
		console.log('-------------------------------------------');
		console.log('map')
		next()
	})
	return dockers
}