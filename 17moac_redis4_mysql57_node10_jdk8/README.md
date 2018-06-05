## moac_nodejs_jdk_redis Dockerfile


This repository contains **Dockerfile** of [Redis](http://redis.io/) for [Docker](https://www.docker.com/)'s [automated build](https://hub.docker.com/r/sparkchain/moac_node_java_mysql_redis/) published to the public [Docker Hub Registry](https://registry.hub.docker.com/).


### Base Docker Image

* [sparkchain/redis4_mysql57_node10_jdk8:4 ](http://dockerfile.github.io/#/ubuntu)


### Installation

1. Install [Docker](https://www.docker.com/).

2. Download [automated build](https://hub.docker.com/r/sparkchain/moac_node_java_mysql_redis/) from public [Docker Hub Registry](https://registry.hub.docker.com/): `docker pull     sparkchain/moac_node_java_mysql_redis:0.8.2 `


### Usage

#### Run `moac_pro`

   docker run -d --name moac -p 8545:8545     sparkchain/moac_node_java_mysql_redis:0.8.2

#### Run `moac_test`

    docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"    sparkchain/moac_node_java_mysql_redis:0.8.2

#### Run `moac_test` with volume.

 docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"  -v /root/:/root/   sparkchain/moac_node_java_mysql_redis:0.8.2

