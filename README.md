viking
------

Docker platform with a node.js vendetta

[viking-brainstorm](https://github.com/binocarlos/viking-brainstorm)

## install

```bash
$ wget -qO- https://raw.github.com/binocarlos/viking/master/bootstrap.sh | sudo bash
```

## config

The following envrionment variables must be set for each viking node (master or slave):

 * HOSTNAME
 * ARPANET_IP - use the IP of the private network
 * ARPANET_MASTERS - comma delimited list of master IP's

For development - you can set the VIKING_DEV variable to point to the current codebase.

This will boot the api server without a docker image rebuild required.

## setup

### run masters

On each master get the images installed:

```bash
$ viking install master
```

On the first master:

```bash
$ viking master start --peers boot
```

On the other masters (3+ masters recommended):

```bash
$ viking master start --peers 192.168.8.120:7001
```

Point the other masters at the IP of the first.

### run slaves

On each slave (which can be the masters if you want):

```bash
$ viking install slave
$ viking slave start
```

## vagrant

The Vagrantfile will boot a 3 node cluster with viking installed.

First vagrant up all 3 servers:

```bash
$ vagrant up
```

The first time you have vagranted - you must pull the images.

SSH to node1 (192.168.8.120:2222):

```bash
$ ssh node2 viking vagrant images
$ ssh node2 viking vagrant images
$ ssh node3 viking vagrant images
```

Now everything is setup - you can:

```bash
$ viking vagrant start
```

This will boot all 3 servers into a viking cluster

To stop them again:

```bash
$ viking vagrant stop
```

## license

MIT