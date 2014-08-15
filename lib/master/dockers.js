var flocker = require('flocker')
var flockercache = require('flocker-cache')
var flatten = require('etcd-flatten')
var Inventory = require('./inventory')

module.exports = function(etcd, opts){
	var dockers = flocker()
	var inventory = Inventory(etcd, opts)
	var c = 0
	dockers.on('request', function(req, res){
		c++
		console.log('-------------------------------------------');
		console.log('docker req: ' + c)
		console.dir(req.url)
	})

	dockers.on('list', function(next){
		console.log('-------------------------------------------');
		console.log('list')
		inventory(function(err, servers){
			if(err) return next(err)
			next(null, servers)
		})
	})

	dockers.on('route', flockercache(function(info, next){
		next()
	}))

	dockers.on('map', function(name, container, image, next){
		next()
	})
	return dockers
}