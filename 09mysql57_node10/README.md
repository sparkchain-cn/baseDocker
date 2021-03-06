## MySQL Dockerfile


This repository contains **Dockerfile** of [MySQL](http://dev.mysql.com/) for [Docker](https://www.docker.com/)'s [automated build](https://hub.docker.com/r/sparkchain/mysql/) published to the public [Docker Hub Registry](https://registry.hub.docker.com/).


### Base Docker Image

* [sparkchain/nodejs:10.1](http://dockerfile.github.io/#/ubuntu)


### Installation

1. Install [Docker](https://www.docker.com/).

2. Download [automated build](https://hub.docker.com/r/sparkchain/mysql/) from public [Docker Hub Registry](https://registry.hub.docker.com/): `docker pull  sparkchain/mysql_node10:5.7`



### Usage

#### Run `mysqld-safe`

    docker run -d --name mysql -p 3306:3306   sparkchain/mysql_node10:5.7 

#### Run `mysql`

    docker run -it --rm --link mysql:mysql   sparkchain/mysql_node10:5.7  bash -c 'mysql -h $MYSQL_PORT_3306_TCP_ADDR'
