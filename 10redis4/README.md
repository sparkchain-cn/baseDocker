## Redis Dockerfile


This repository contains **Dockerfile** of [Redis](http://redis.io/) for [Docker](https://www.docker.com/)'s [automated build](https://hub.docker.com/r/sparkchain/redis/) published to the public [Docker Hub Registry](https://registry.hub.docker.com/).


### Base Docker Image

* [sparkchain/ubuntu:16.04](http://dockerfile.github.io/#/ubuntu)


### Installation

1. Install [Docker](https://www.docker.com/).

2. Download [automated build](https://hub.docker.com/r/sparkchain/redis/) from public [Docker Hub Registry](https://registry.hub.docker.com/): `docker pull  sparkchain/redis:4 `


### Usage

#### Run `redis-server`

    docker run -d --name redis -p 6379:6379  sparkchain/redis:4 

#### Run `redis-server` with persistent data directory. (creates `dump.rdb`)

    docker run -d -p 6379:6379 -v <data-dir>:/data --name redis  sparkchain/redis:4 

#### Run `redis-server` with persistent data directory and password.

    docker run -d -p 6379:6379 -v <data-dir>:/data --name redis sparkchain/redis:4  redis-server /etc/redis/redis.conf --requirepass <password>

#### Run `redis-cli`

    docker run -it --rm --link redis:redis  sparkchain/redis:4  bash -c 'redis-cli -h redis'
