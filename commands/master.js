var Master = require('../lib/master')
var args = require('minimist')(process.argv, {
	alias:{
		
	},
	default:{
		
	}
})
var master = Master(args)
master.start(function(err){
	if(err){
		console.error(err)
		process.exit(1)
	}
})