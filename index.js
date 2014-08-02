var fs = require('fs')
var command = provess.argv[2] || 'help'

if(!fs.existsSync(command)){
  command = 'help'
}

var commandfn = require('./commands/' + command)
commandfn()