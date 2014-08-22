var utils = require('../lib/utils')
var Slave = require('../lib/slave')
var args = utils.getArgs({
	'tags':'t'
})
var slave = Slave(args)
var cmd = args._[3]
var commands = {
	info:function(){
		console.log(JSON.stringify(slave.info(args), null, 4))
	},
	join:function(){
		slave.join(args, function(err){
			if(err){
				console.error(err)
				process.exit(1)
			}
			var info = slave.info(args)
			console.log('joined')
			console.log('hostname: ' + info.hostname)
			console.log('ip: ' + info.ip)
		})
	},
	leave:function(){
		slave.leave(args, function(err){
			if(err){
				console.error(err)
				process.exit(1)
			}
			var info = slave.info(args)
			console.log('left')
			console.log('hostname: ' + info.hostname)
			console.log('ip: ' + info.ip)
		})
	}
}
if(!commands[cmd]){
	console.error(cmd + ' command not found')
	process.exit(1)
}
commands[cmd]()