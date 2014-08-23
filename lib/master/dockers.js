var flocker = require('flocker')
var flockercache = require('flocker-cache')
var flatten = require('etcd-flatten')
var dowding = require('dowding')

var Inventory = require('./inventory')

module.exports = function(etcd, opts){
	var dockers = flocker()
	var inventory = Inventory(etcd, opts)

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

		/*
		
			here we need to:

			 * check the VIKING_VOLUMEFROM_X variables and ensure they all live together
			 * if defined give 'parent' to dowding for routing
			
		*/
		scheduler.allocate({
			name:info.name
		}, function(err, server){
			if(err) return next(err)
			console.log('allocate: ' + info.name + '=' + server.hostname)
			next(null, server)
		})

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