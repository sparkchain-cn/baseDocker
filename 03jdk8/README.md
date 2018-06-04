## Oralce JKD8  Dockerfile


This repository contains **Dockerfile** of [Python](https://www.python.org/) for [Docker](https://www.docker.com/)'s [automated build](https://hub.docker.com/r/sparkchain/jdk/) published to the public [Docker Hub Registry](https://registry.hub.docker.com/).


### Base Docker Image

* [sparkchain/ubuntu:16.04](https://hub.docker.com/r/sparkchain/ubuntu/)


### Installation

1. Install [Docker](https://www.docker.com/).

2. Download [automated build](https://hub.docker.com/r/sparkchain/jdk/) from public [Docker Hub Registry](https://registry.hub.docker.com/): `docker pull sparkchain/jdk:1.8`

### Usage

    docker run -it --rm sparkchain/jdk:1.8

#### Run `jdk`

    docker run -it --rm sparkchain/jdk:1.8
