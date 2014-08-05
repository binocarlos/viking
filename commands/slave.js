var args = require('minimist')(process.argv, {
	alias:{
		
	},
	default:{
		
	}
})

setInterval(function(){
	console.log('checking services')
},1000)