var etcdjs = require('../etcd')
var info = require('./info')

module.exports = function(opts){
	var etcd = etcdjs(opts.etcd)
	return {
		info:function(args){
			return info(args)
		},
		join:function(args){

		},
		leave:function(args){

		}
	}
}