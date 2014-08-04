#!/usr/bin/env bash
set -eo pipefail
export DEBIAN_FRONTEND=noninteractive
export VIKING_REPO=${VIKING_REPO:-"https://github.com/binocarlos/viking.git"}

if ! which apt-get &>/dev/null
then
  echo "This installation script requires apt-get. For manual installation instructions, consult https://github.com/binocarlos/viking ."
  exit 1
fi

apt-get update
apt-get install -y git make curl

cd ~ && test -d viking || git clone $VIKING_REPO
cd viking
git fetch origin
make install