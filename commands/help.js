var fs = require('fs')
var path = require('path')
var args = require('minimist')(process.argv, {
	alias:{}
})
var section = args._[3] || 'main'
var path = path.join(__dirname, '..', 'help', section + '.txt')
if(!fs.existsSync(path)){
	section = 'main'
}
var helpFile = fs.createReadStream(path)
helpFile.on('error', function(err){
	console.error(err)
	process.exit(1)
})
helpFile.pipe(process.stdout)