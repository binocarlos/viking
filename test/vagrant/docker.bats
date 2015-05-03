#!/usr/bin/env bats

@test "docker version exit with zero" {
  docker version
}

@test "docker version is at least 1.6.0" {
  local version=$(docker version | grep "Server version" | sed 's/Server version: //')
  [ `echo $version |cut -d'.' -f1` -gt 0 ]
  [ `echo $version |cut -d'.' -f2` -gt 5 ]
}

@test "pull a docker image" {
  echo "remove busybox image"
  docker rmi -f busybox || true
  echo "pull busybox image"
  docker pull busybox
  local pulled=$(docker images | grep busybox)
  echo $pulled
  [[ "$pulled" =~ "busybox" ]]
}