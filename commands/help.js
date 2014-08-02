var fs = require('fs')
var args = require('minimist')(process.argv, {
	alias:{
		
	},
	default:{
		
	}
})

var topic = args._[2]
var baseFolder = path.join(__dirname, path.normalize('../docs/help'))

if(!fs.existsSync(path.join(baseFolder, topic + '.txt'))){
	topic = 'viking'
}

var content = fs.readFileSync(path.join(baseFolder, topic + '.txt'), 'utf8')
console.log(content)