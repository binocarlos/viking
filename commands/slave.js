var Slave = require('../lib/slave')
var args = require('minimist')(process.argv, {
	alias:{
		'tags':'t'
	},
	default:{
		
	}
})
var slave = Slave(args)
slave.start(function(err){
	if(err){
		console.error(err)
		process.exit(1)
	}
})