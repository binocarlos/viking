var Router = require('routes-router')
var V1 = require('./v1')
var EventEmitter = require('events').EventEmitter

module.exports = function(etcd, opts, dockers){
	var emitter = new EventEmitter()
	var router = Router({
	  errorHandler: function (req, res) {
	    res.statusCode = 500
	    res.end("error")
	  },
	  notFound: function (req, res) {
	  	dockers.handle(req, res)
	  }
	})
	var v1 = V1(etcd, opts, dockers)
	router.prefix('/v1', v1)
	return router
}