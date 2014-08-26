var Router = require('routes-router')
var Inventory = require('../inventory')
var url = require('url')

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

function locate(etcd, opts, dockers){
	return function(req, res, opts){

		var id = opts.params.id

		if(!id){
			res.statusCode = 500
			res.end('id option required')
		}

		var query = url.parse(req.url, true).query
		var field = query.field

		dockers.find(id, function(err, backend){

			if(err){
				res.statusCode = 500
				res.end(err)
				return
			}

			if(!(field || '').match(/\w/)){
				res.end(JSON.stringify(backend))
			}
			else{
				backend.ip = backend.docker.split(':')[0]

				if(!backend[field]){
					res.statusCode = 500
					res.end(field + ' property not found')
					return
				}

				res.end(backend[field].toString())
			}
		})


	}
}

module.exports = function(etcd, opts, dockers){
	var router = Router()
	router.addRoute('/servers/json', serverjson(etcd, opts, dockers))
	router.addRoute('/locate/:id', locate(etcd, opts, dockers))
	return router
}