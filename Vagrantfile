# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "private_network", ip: "192.168.8.110"
  config.vm.network :forwarded_port, guest: 443, host: 443
  config.vm.network :forwarded_port, guest: 443, host: 4443
  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.hostname = "node1"
  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    v.cpus = 1
  end
  config.vm.provision "shell", inline: <<SCRIPT
cd /vagrant && make all
ln -s /vagrant/viking /usr/local/bin/viking
SCRIPT
end