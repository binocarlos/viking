var args = require('minimist')(process.argv, {
	alias:{
		
	},
	default:{
		
	}
})

var commands = {
	token:commandToken,
	start:commandStart
}

var command = args._[2] || 'start'

commands[command]()