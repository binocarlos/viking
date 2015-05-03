.PHONEY: all apt-repos apt-configure apt-install docker bats installpackages removepackages gitconfig gitshortcuts

# AUTO INSTALL (parts that are run from vagrant provision)

# setup any apt repos we need before installing packages
apt-repos:
	sudo add-apt-repository ppa:voronov84/andreyv -y

# setup repos and then apt-get update
apt-configure: apt-repos
	sudo apt-get update

# install apt packages
apt-install:
	sudo apt-get install -y \
		linux-image-extra-`uname -r` \
		git

# install docker (which will use aufs if installed)
docker:
	curl -sSL https://get.docker.io/ubuntu/ | sudo sh
	# means the dev user can directly use the docker command
	sudo usermod -a -G docker vagrant

# install the bats bash testing framework
bats:
	cd /tmp && git clone https://github.com/sstephenson/bats.git
	sudo /tmp/bats/install.sh /usr/local

# apt packages then other packages
installpackages: apt-configure apt-install docker bats

# remove puppet, chef
removepackages:
	sudo bash -c "echo 'manual' > /etc/init/puppet.override"
	sudo bash -c "echo 'manual' > /etc/init/chef.override"
	sudo apt-get remove -y --auto-remove puppet chef
	sudo apt-get purge -y --auto-remove puppet chef

all: removepackages installpackages

# manual (parts that are run from a command line after provisioning)

# configures git with our details
gitconfig: gitshortcuts
	git config --global user.name "${GIT_NAME}"
	git config --global user.email "${GIT_EMAIL}"
	git config --global credential.helper 'cache --timeout=3600'

gitshortcuts:
	git config --global alias.ac '!git add -A && git commit'

