var utils = require('../lib/utils')
var Master = require('../lib/master')
var args = utils.getArgs()
var master = Master(args)
master.start(function(err){
	if(err){
		console.error(err)
		process.exit(1)
	}
})