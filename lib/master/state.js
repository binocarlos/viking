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
	var path = this.etcdPath('/ports/exposed/' + name)
	this._etcd.set(path, ports.join(','), done)
}

State.prototype.getServicePorts = function(name, done){
	var path = this.etcdPath('/ports/exposed/' + name)
	this._etcd.get(path, function(err, result){
		if(err) return done(err)
		if(!result || !result.node || !result.node.value) return done(null, [])
		var parts = results.node.value.split(',')
		done(null, parts)
	})
}

/*

	keep a record of the pre-allocated internal ports
	
*/
State.prototype.setInternalPort = function(name, port, done){
	var path = this.etcdPath('/ports/internal/' + name)
	this._etcd.set(path, port, done)
}

State.prototype.getInternalPort = function(name, done){
	var path = this.etcdPath('/ports/internal/' + name)
	this._etcd.get(path, function(err, result){
		if(err || !result || !result.node || !result.node.value) return done()
		done(null, result.node.value)
	})
}

/*

	WARNING - this is non-lock aware - it should be run via the ports.js buffer
	
*/
State.prototype.getGlobalPort = function(done){
	var path = this.etcdPath('/ports/global')
	this._etcd.get(path, function(err, result){
		if(err || !result || !result.node || !result.node.value) return done(null, 1024)
		done(null, parseInt(result.node.value))
	})	
}

State.prototype.setGlobalPort = function(value, done){
	var path = this.etcdPath('/ports/global')
	this._etcd.set(path, value, done)
}

module.exports = function(etcd, opts){
	return new State(etcd, opts)
}