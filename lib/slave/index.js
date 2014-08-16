var etcdjs = require('../etcd')
var getInfo = require('./info')

module.exports = function(opts){

	var etcd = etcdjs(opts)

	return {
		info:getInfo,
		/*
		
			write the slave info to the inventory

			this will trigger the active master to start
			health checking the docker slave
			
		*/
		join:function(args, done){
			var info = getInfo(args)
			etcd.set(info.etcdpath + '/inventory/' + info.hostname, JSON.stringify(info), done)
		},
		/*
		
			delete the slave info from the inventory
			
		*/
		leave:function(args, done){
			var info = getInfo(args)
			etcd.del(info.etcdpath + '/inventory/' + info.hostname, done)
		}
	}
}