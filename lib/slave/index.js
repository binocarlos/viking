var etcdjs = require('../etcd')
var info = require('./info')

module.exports = function(opts){
	var etcd = etcdjs(opts.etcd)
	return {
		info:function(args){
			return info(args)
		},
		/*
		
			write the slave info to the inventory

			this will trigger the active master to start
			health checking the docker slave
			
		*/
		join:function(args){

		},
		/*
		
			delete the slave info from the inventory
			
		*/
		leave:function(args){

		}
	}
}