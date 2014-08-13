var flocker = require('flocker')
var flockercache = require('flocker-cache')
var flatten = require('etcd-flatten')
var liveCollection = require('etcd-live-collection')

// load the server list from /inventory
function getServers(etcd, opts, done){
	etcd.get(opts.etcdpath + '/inventory', {
		recursive:true
	}, function(err, result){
		if(err) return done(err)
		if(!result || !result.node){
			return done(null, [])
		}
		result = flatten(result.node)
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.dir(result)
		process.exit()
	})
}

module.exports = function(etcd, opts){
	var dockers = flocker()

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
		getServers(etcd, opts, function(err, servers){
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