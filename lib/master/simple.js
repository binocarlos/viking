var http = require('http')
var hyperquest = require('hyperquest')
var concat = require('concat-stream')

var counter = 0


var server = http.createServer(function(req, res){
	function doRes(req){
		counter++
		if(counter>100){
			gc()
			counter=0
		}
		return counter + ': ' + req.url
	}
	res.end(doRes(req))
})

server.listen(8080)


function doReq(){
	hyperquest('http://127.0.0.1:8080/hello').pipe(concat(function(result){
		console.log(result.toString())
		setTimeout(doReq, 1)
	}))
}

setTimeout(doReq, 100)