#!/bin/bash

export VIKING_REPO=${VIKING_REPO:=https://github.com/binocarlos/viking.git}
export VIKING_BRANCH=${VIKING_BRANCH:=master}
export VIKING_INSTALLATION=${VIKING_INSTALLATION:=/opt/viking}

[ `id -u` = 0 ] || {
  echo "install.sh must be run as 'root'" >&2
  exit 1
}

#mkdir -p $BIGSTACK_INSTALLATION
git clone $VIKING_REPO $VIKING_INSTALLATION
cd $VIKING_INSTALLATION && git checkout $VIKING_BRANCH
cd $VIKING_INSTALLATION && make all
ln -s $VIKING_INSTALLATION/viking /usr/local/bin/viking