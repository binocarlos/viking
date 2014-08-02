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
	console.log('-------------------------------------------');
	console.dir(args)
}