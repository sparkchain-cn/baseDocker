## Redis_JDK_mysql_node10  Dockerfile


This repository contains **Dockerfile** of [Redis](http://redis.io/) for [Docker](https://www.docker.com/)'s [automated build](https://hub.docker.com/r/sparkchain/redis4_mysql57_node10_jdk8/) published to the public [Docker Hub Registry](https://registry.hub.docker.com/).


### Base Docker Image

* [sparkchain/mysql_node10:5.7](http://dockerfile.github.io/#/ubuntu)


### Installation

1. Install [Docker](https://www.docker.com/).

2. Download [automated build](https://hub.docker.com/r/sparkchain/redis4_mysql57_node10_jdk8/) from public [Docker Hub Registry](https://registry.hub.docker.com/): `docker pull   sparkchain/redis4_mysql57_node10:4 `


### Usage

#### Run `redis-server`


    docker run -d --name redis -p 6379:6379   sparkchain/redis4_mysql57_node10_jdk8:4

#### Run `redis-server` with persistent data directory. (creates `dump.rdb`)

    docker run -d -p 6379:6379 -v <data-dir>:/data --name redis     sparkchain/redis4_mysql57_node10_jdk8:4 

#### Run `redis-server` with persistent data directory and password.

    docker run -d -p 6379:6379 -v <data-dir>:/data --name redis   sparkchain/redis4_mysql57_node10_jdk8:4 redis-server /etc/redis/redis.conf --requirepass <password>

#### Run `redis-cli`

    docker run -it --rm --link redis:redis    sparkchain/redis4_mysql57_node10_jdk8:4  bash -c 'redis-cli -h redis'
