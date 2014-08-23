var EventEmitter = require('events').EventEmitter
var util = require('util')
var utils = require('../utils')

function State(etcd, opts){
	EventEmitter.call(this)
	this._etcd = etcd
	this._opts = opts || {}
}

util.inherits(State, EventEmitter)

module.exports = State

State.prototype.etcdPath = function(path){
	var basePath = this._opts.etcdpath
	return basePath + path
}

// save the ports that a service exposes
State.prototype.setServicePorts = function(name, ports, done){
	var path = this.etcdPath('/service/' + name + '/ports')
	this._etcd.set(path, ports.join(','), done)
}

State.prototype.getServicePorts = function(name, done){
	var path = this.etcdPath('/service/' + name + '/ports')
	this._etcd.get(path, function(err, result){
		if(err) return done(err)
		if(!result || !result.node || !result.node.value) return done(null, [])
		var parts = results.node.value.split(',')
		done(null, parts)
	})
}

module.exports = function(etcd, opts){
	return new State(etcd, opts)
}