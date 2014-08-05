.PHONY: vagrant

image:
	docker build -t binocarlos/viking .

vagrant:
	usermod -aG docker vagrant