var Router = require('routes-router')
var Inventory = require('../inventory')

function serverjson(etcd, opts, dockers){
	var inventory = Inventory(etcd, opts)
	return function(req, res){
		inventory.json(function(err, json){
			if(err){
				res.statusCode = 500
				res.end(err)
				return
			}
			res.setHeader('content-type', 'application/json')
			res.end(JSON.stringify(json))
		})
	}
}

module.exports = function(etcd, opts, dockers){
	var router = Router()
	router.addRoute('/servers/json', serverjson(etcd, opts, dockers))
	return router
}