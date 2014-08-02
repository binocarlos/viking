var fs = require('fs')
var command = process.argv[2] || 'help'

if(!fs.existsSync(command)){
  command = 'help'
}

require('./commands/' + command)