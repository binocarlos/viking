var http = require('http')
var args = require('minimist')(process.argv, {
	alias:{
		
	},
	default:{
		
	}
})

var app = function(req,res){
	res.end('ok')
}
var server = http.createServer(app)
server.listen(80)