var flocker = require('flocker')
var flockercache = require('flocker-cache')
var flatten = require('etcd-flatten')
var Inventory = require('./inventory')
var dowding = require('dowding')

module.exports = function(etcd, opts){
	var dockers = flocker()
	var inventory = Inventory(etcd, opts)

	var scheduler = dowding({
		inventory:function(done){
			inventory.list(done)
		}
	})

	dockers.on('request', function(req, res){
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.dir(req.method + ' ' + req.url)
	})

	dockers.on('list', function(next){
		inventory.list(function(err, servers){
			if(err) return next(err)
			next(null, servers)
		})
	})

	dockers.on('route', flockercache(function(info, next){

		scheduler.allocate({
			name:info.name
		}, function(err, server){
			if(err) return next(err)
			console.log('allocate: ' + info.name + '=' + server.hostname)
			next(null, server)
		})

	}))

	dockers.on('map', function(name, container, image, next){
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.log('map')
		console.dir(name)
		console.dir(container)
		console.dir(image)
		next()
	})

	dockers.on('start', function(name, container, image, bootRecord, next){
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.log('start')		
		console.log(name)
		console.dir(container)
		console.dir(image)
		console.dir(bootRecord)
		next()
	})
	
	return dockers
}