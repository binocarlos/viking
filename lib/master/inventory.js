var LiveCollection = require('etcd-live-collection')

module.exports = function(etcd, opts){

	var collection = LiveCollection(etcd, opts.etcdpath + '/inventory')

	function getValues(){
		return collection.values().map(function(server){
			return JSON.parse(server)
		})
	}

	var buffer = []
	var ready = false

	collection.on('ready', function(){
		ready = true
		buffer.forEach(function(fn){
			fn()
		})
	})

	return function(done){
		if(!ready){
			buffer.push(function(){
				done(null, getValues())
			})
		}
		else{
			done(null, getValues())
		}
	}
}