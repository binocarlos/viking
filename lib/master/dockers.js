var flocker = require('flocker')
var flockercache = require('flocker-cache')
var flatten = require('etcd-flatten')
var dowding = require('dowding')

var async = require('async')
var job = require('./job')
var State = require('./state')
var Inventory = require('./inventory')

module.exports = function(etcd, opts){
	var dockers = flocker()
	var inventory = Inventory(etcd, opts)
	var state = State(etcd, opts)
	
	var scheduler = dowding({
		inventory:function(done){
			inventory.list(done)
		}
	})

	dockers.on('request', function(req, res){
		console.log('dockers req: ' + req.method + ' ' + req.url)
	})

	dockers.on('list', function(next){

		inventory.list(function(err, servers){
			if(err) return next(err)
			next(null, servers)
		})
	})

	/*
	
		we need to add a 'filter' function to flocker

		this will filter the inventory before passing
		the list of servers to dowding for allocation

		this means we can call a server 'full'

		
	*/

	dockers.on('route', flockercache(function(info, next){

		var container = info.container

		if(!container){
			next('no container found from routing info')
		}

		/*
		
			here we need to:

			 * check the VIKING_VOLUMEFROM_X variables and ensure they all live together
			 * if defined then manually route to discovered host
			
		*/
		var allocateInfo = {
			name:info.name
		}

		var volumesFrom = job.envVolumesFrom(container.Env)

		function doAllocation(){
			scheduler.allocate(allocateInfo, function(err, server){
				if(err) return next(err)
				console.log('allocate: ' + info.name + '=' + server.hostname)
				next(null, server)
			})	
		}

		// make sure the targets are all on the same server and the route to that server
		if(volumesFrom.length>0){

			var map = {}
			
			async.forEach(volumesFrom, function(name, nextName){
				dockers.find(name, function(err, backend){
					if(!backend) err = name + ' was not found to link to'
					if(err) return nextName(err)
					map[backend.hostname] = backend
					nextName()
				})
			}, function(err){
				if(err) return next(err)
				if(Object.keys(map).length>1){
					// yikes we have multiple volume froms and they are on different servers
					return next('unroutable volume-from command ' + volumesFrom.join(', ') + ' are on multiple servers')
				}

				// bypass dowding and route directly
				var server = map[Object.keys(map)[0]]
				next(null, server)
			})
		}
		else{
			doAllocation()
		}
	}))

	dockers.on('map', function(name, container, image, next){

		/*
		
			here we need to:

       * extract the service name from the name (mongo.2 = mongo)
			 * study the container for exposed ports
			 * for each port create a SERVICE_$PORT_NAME=mongo
			 * study the links and if > 0 then replace with a link to 'backends'
			 * for each link - inject the envrionment based on the servicename
			
		*/
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