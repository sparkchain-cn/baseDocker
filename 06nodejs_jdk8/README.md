## Node.js Dockerfile


This repository contains **Dockerfile** of [Node.js](http://nodejs.org/) for [Docker](https://www.docker.com/)'s [automated build](https://hub.docker.com/r/sparkchain/nodejs_jdk8/) published to the public [Docker Hub Registry](https://registry.hub.docker.com/).


### Base Docker Image

* [sparkchain/jdk_py:1.8](http://dockerfile.github.io/#/python)


### Installation

1. Install [Docker](https://www.docker.com/).

2. Download [automated build](https://hub.docker.com/r/sparkchain/nodejs_jdk8/) from public [Docker Hub Registry](https://registry.hub.docker.com/): `docker pull sparkchain/nodejs:10.1`



### Usage

    docker run -it --rm sparkchain/nodejs_jdk8:10.1

#### Run `node`

    docker run -it --rm sparkchain/nodejs_jdk8:10.1 node

#### Run `npm`

    docker run -it --rm sparkchain/nodejs_jdk8:10.1 npm
