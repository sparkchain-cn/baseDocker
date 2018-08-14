## moac Dockerfile

https://github.com/MOACChain/moac-core/releases/download/v1.0.2/nuwa-vnode1.0.2.ubuntu.tar.gz

This repository contains **Dockerfile** of [Redis](http://redis.io/) for [Docker](https://www.docker.com/)'s [automated build](https://hub.docker.com/r/sparkchain/moac/) published to the public [Docker Hub Registry](https://registry.hub.docker.com/).


### Base Docker Image

* [sparkchain/mysql_node10:5.7](http://dockerfile.github.io/#/ubuntu)


### Installation

1. Install [Docker](https://www.docker.com/).

2. Download [automated build](https://hub.docker.com/r/sparkchain/moac/) from public [Docker Hub Registry](https://registry.hub.docker.com/): `docker pull   sparkchain/moac:0.8.2 `


### Usage

#### Run `moac_pro`

   docker run -d --name moac -p 8545:8545   sparkchain/moac:0.8.2

#### Run `moac_test`

    docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"  sparkchain/moac:0.8.2

#### Run `moac_test` with volume.

 docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"  -v /root/:/root/ sparkchain/moac:0.8.2

