var utils = require('../lib/utils')
var Slave = require('../lib/slave')
var args = utils.getArgs({
	'tag':'t'
})
var slave = Slave(args)
var cmd = args._[3]
var commands = {
	info:function(){
		console.log(JSON.stringify(slave.info(args), null, 4))
	},
	join:function(){
		console.log('join')
	},
	leave:function(){
		console.log('leave')
	}
}
if(!commands[cmd]){
	console.error(cmd + ' command not found')
	process.exit(1)
}
commands[cmd]()