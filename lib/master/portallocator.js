module.exports = function(etcd, opts){

	opts = opts || {}
	var baseKey = opts.etcdpath + '/ports'
	// we run one allocation at a time
	var buffer = []

	function runNext(){
		if(buffer.length<=0){
			return
		}
		var next = buffer.shift()
		next()
	}

	function runAllocation(state, name, done){
		// first see if it has already been allocated
		state.getInternalPort(name, function(err, port){
			if(port){
				setTimeout(function(){
					runNext()
				}, 1)
				return done(null, port)
			}

			// no - so global increment
			state.getGlobalPort(function(err, port){

				port++
				var returnPort = port
				state.setGlobalPort(returnPort, function(){

					state.setInternalPort(name, returnPort, function(){
						setTimeout(function(){
							runNext()
						}, 1)
						done(null, returnPort)
					})
				})

			})
		})
	}

	return function(state, name, done){
		buffer.push(function(){
			runAllocation(state, name, done)
		})
		runNext()
	}
}