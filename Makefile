.PHONY: image vagrant install

install:
	wget -qO- https://raw.github.com/binocarlos/arpanet/master/bootstrap.sh | sudo bash
	cp viking /usr/local/bin
	sudo viking install core

image:
	docker build -t binocarlos/viking .

dev:
	ln -sf /srv/projects/viking/viking /usr/local/bin/viking

vagrant:
	usermod -aG docker vagrant