.PHONY: install

install:
	sudo -E bash -c './install core'

vagrant:
	usermod -aG docker vagrant