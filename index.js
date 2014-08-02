var fs = require('fs')
var path = require('path')
var command = process.argv[2] || 'help'

var commandPath = path.join(__dirname, 'commands', command + '.js')

if(fs.existsSync(commandPath)){
  require(commandPath)
}
else{
	var args = process.argv.splice(2)
	console.log('-------------------------------------------');
	console.dir(args)
}