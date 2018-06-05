## moac_nodejs Dockerfile


This repository contains **Dockerfile** of [Redis](http://redis.io/) for [Docker](https://www.docker.com/)'s [automated build](https://hub.docker.com/r/sparkchain/moac_node10/) published to the public [Docker Hub Registry](https://registry.hub.docker.com/).


### Base Docker Image

* [sparkchain/nodejs:10.1](http://dockerfile.github.io/#/ubuntu)


### Installation

1. Install [Docker](https://www.docker.com/).

2. Download [automated build](https://hub.docker.com/r/sparkchain/moac_node10/) from public [Docker Hub Registry](https://registry.hub.docker.com/): `docker pull    sparkchain/moac_node10:0.8.2 `


### Usage

#### Run `moac_pro`

   docker run -d --name moac -p 8545:8545    sparkchain/moac_node10:0.8.2

#### Run `moac_test`

    docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"   sparkchain/moac_node10:0.8.2

#### Run `moac_test` with volume.

 docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"  -v /root/:/root/  sparkchain/moac_node10:0.8.2

