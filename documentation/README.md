## viking

viking is a docker cluster manager.

## motivation

Managing a network of docker containers communicating across a network can be hard.

There is a thriving ecosystem of tools designed to help you do it:

 * [kubernetes](https://github.com/GoogleCloudPlatform/kubernetes)
 * [flynn](https://flynn.io/)
 * [coreos](https://coreos.com/)

These tools all provide solutions for running docker containers across multiple hosts and provide networking tools to get those containers to communicate with each other.

Viking is another take on a solution to this problem.

It takes it's inspiration from [libswarm](https://github.com/docker/libswarm) - the golang library in development at Docker.

The core idea behind viking is to not invent a new abstraction or toolset but to hide away the complexity of networking and clustering behind what looks like a normal docker server.

Think of it like actually having 100 servers but talking to them as though it was one docker server 100 times bigger than normal.

This helps developers and systems to run docker commands (like everyone is already used to) without ever having to think about 'where' they are running those commands.

## features

### Docker compatible API

you can run vanilla docker commands against a viking cluster

### Intelligent routing

a new container is automatically run on the server with the most resources free (uses Googles cadvisor)

### Auto linking

the --link flag magically load balances TCP traffic across hosts and to multiple endpoints (easy scale)

### Brokerless design

If a viking master goes down everything still works thanks to the distributed nature of a viking cluster (uses etcd)

## design

There are 2 main roles in a viking cluster:

 * master
 * slave





