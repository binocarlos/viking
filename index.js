var fs = require('fs')
var path = require('path')
var trig = require('trig')
var command = process.argv[2] || 'help'
var commandPath = path.join(__dirname, 'commands', command + '.js')

if(fs.existsSync(commandPath)){
  require(commandPath)
}
else{
	var args = process.argv.splice(3)
	var files = [path.join(__dirname, 'triggers', 'default')]
	if(process.env.VIKING_TRIGGERS && fs.existsSync(process.env.VIKING_TRIGGERS)){
		files.push(process.env.VIKING_TRIGGERS)
	}
	var command = trig.plan(files, command, args)
	console.log('-------------------------------------------');
	console.dir(command)
}