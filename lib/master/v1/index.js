var Router = require('routes-router')

function serverjson(req, res){
	res.end('server json')
}

module.exports = function(){
	var router = Router()
	router.addRoute('/servers/json', serverjson)
	return router
}