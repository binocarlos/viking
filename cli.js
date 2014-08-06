var memwatch = require('memwatch');
var fs = require('fs')
var path = require('path')
memwatch.on('leak', function(info) { console.dir(info) });
function commandPath(name){
	return path.join(__dirname, 'commands', command + '.js')
}
var command = process.argv[2] || 'help'
if(!fs.existsSync(commandPath(command))){
	command = 'help'
}

require(commandPath(command))