module.exports = {

	// extract the VIKING_VOLUMEFROM_'s from some env vars
	envVolumesFrom:function(env){
		return env.filter(function(env){
			return env.indexOf('VIKING_VOLUMEFROM_')==0
		}).map(function(env){
			return env.split('=')[1]
		})
	},

	// extract the VIKING_LINK_'s from some env vars
	envLinks:function(env){
		return env.filter(function(env){
			return env.indexOf('VIKING_LINK_')==0
		}).map(function(env){
			return env.split('=')[1]
		})
	}
}