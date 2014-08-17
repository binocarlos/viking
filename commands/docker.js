var strippedArgs = process.argv.slice(2)
var args = require('minimist')(strippedArgs)

// check for volumes and links
if(args._[1]=='run'){

	// split the command into docker args and command args
	var image = args._[2]

	var hit = false
	var dockerargs = strippedArgs.filter(function(arg){
		if(arg==image){
			hit = true
		}
		return !hit
	})

	console.log(dockerargs)
}
