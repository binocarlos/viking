var utils = require('../lib/utils')
var minimist = require('minimist')
var strippedArgs = process.argv.slice(2)
var vikingargs = utils.getArgs()
var args = minimist(strippedArgs)
var master = vikingargs.masters.split(',')[0] + ':' + vikingargs.masterport

// check for volumes and links
if(args._[1]=='run'){

	// split the command into docker args and command args
	var image = args._[2]

	var hit = false
	var dockerargs = []
	var imageargs = []
	strippedArgs.filter(function(arg){
		if(arg==image){
			hit = true
		}
		if(hit){
			imageargs.push(arg)
		}
		else{
			dockerargs.push(arg)
		}
	})

	dockerargs = dockerargs.slice(2)
	var parsedDockerArgs = minimist(dockerargs, {
		alias:{
			v:'volume'
		}
	})
	var links = parsedDockerArgs.link
	var volumes = parsedDockerArgs.volume
	var volumesFrom = parsedDockerArgs['volumes-from']

	if(links){
		if(typeof(links)=='string'){
			links = [links]
		}
		links.forEach(function(link, i){
			dockerargs.push('-e')
			dockerargs.push('VIKING_LINK' + i + '=' + link)
		})
	}

	if(volumes){
		if(typeof(volumes)=='string'){
			volumes = [volumes]
		}	
		volumes.forEach(function(volume, i){
			dockerargs.push('-e')
			dockerargs.push('VIKING_VOLUME' + i + '=' + volume)
		})
	}

	if(volumesFrom){
		if(typeof(volumesFrom)=='string'){
			volumesFrom = [volumesFrom]
		}	
		volumesFrom.forEach(function(volume, i){
			dockerargs.push('-e')
			dockerargs.push('VIKING_VOLUMEFROM' + i + '=' + volume)
		})
	}

	
	var allArgs = ['docker', '-H', master, 'run'].concat(dockerargs, imageargs)

	console.log('eval ' + allArgs.join(' '))
}
else{

	
	strippedArgs.shift()
	strippedArgs.unshift(master)
	strippedArgs.unshift('-H')
	strippedArgs.unshift('docker')

	console.log('eval ' + strippedArgs.join(' '))
}
