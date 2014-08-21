.PHONY: image vagrant install

install:
	wget -qO- https://raw.github.com/binocarlos/arpanet/master/bootstrap.sh | sudo bash
	cp viking /usr/local/bin

image:
	docker build -t binocarlos/viking .

vagrant:
	usermod -aG docker vagrant