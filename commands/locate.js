var utils = require('../lib/utils')
var masteraddress = require('../lib/masteraddress')
var hyperquest = require('hyperquest')
var concat = require('concat-stream')
var args = utils.getArgs({
	'field':'f'
})

var addresses = masteraddress(args)
if(!addresses || addresses.length<=0){
	console.error('no masters found')
	process.exit(1)
}

var id = args._[3]

if(!id){
	console.error('usage: viking locate <id>')
	process.exit(1)
}

var address = addresses[0]

var req = hyperquest('http://' + address + '/v1/locate/' + id + '?field=' + (args.field || ''))

req.on('response', function(res){
	res.pipe(concat(function(result){
		result = result.toString()
		if(res.statusCode!=200){
			console.error(res.statusCode + ': ' + result)
			process.exit(1)
		}
		console.log(result)
	}))
})

req.on('error', function(err){
	console.error(err)
	process.exit(1)
})