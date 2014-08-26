.PHONY: arpanet install linkscript usermod image vagrant

arpanet:
	wget -qO- https://raw.github.com/binocarlos/arpanet/master/bootstrap.sh | sudo bash
	arpanet install core

install: arpanet
	cp -f viking /usr/local/bin
	docker pull binocarlos/viking

linkscript:
	ln -sf /vagrant/viking /usr/local/bin/viking

usermod:
	usermod -aG docker vagrant

image:
	docker build -t binocarlos/viking .

vagrant: arpanet linkscript usermod

test:
	./vagrant/admin start
	./vagrant/admin test
	./vagrant/admin stop
