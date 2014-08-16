var LiveCollection = require('etcd-live-collection')

module.exports = function(etcd, opts){

	var collection = LiveCollection(etcd, opts.etcdpath + '/inventory')

	function listServers(){
		var vals = collection.values() || {}
		return Object.keys(vals || {}).map(function(nodepath){
			var serverString = vals[nodepath]
			var serverData = JSON.parse(serverString)
			return {
				hostname:serverData.hostname,
				docker:serverData.ip + ':' + serverData.dockerport
			}
		})
	}

	function json(){
		var vals = collection.values() || {}
		return Object.keys(vals || {}).map(function(key){
			return JSON.parse(vals[key])
		})
	}

	function bufferFunction(fn){
		if(!ready){
			buffer.push(fn)
		}
		else{
			fn()
		}
	}

	var buffer = []
	var ready = false

	collection.on('ready', function(){
		ready = true
		buffer.forEach(function(fn){
			fn()
		})
	})

	return {
		list:function(done){
			bufferFunction(function(){
				done(null, listServers())
			})
		},
		json:function(done){
			bufferFunction(function(){
				done(null, json())
			})
		}
	}
}