火花链基本Docker镜像
==============
[![Build Status](https://travis-ci.org/QianmiOpen/interface-test.svg?branch=master)](#)

火花链基本Docker镜像主要fork了[dockerfile用户]（https://github.com/dockerfile)的dockerfile文件，在其基础编写了基于区块链的接入平台的docker镜像。为了方便用户开发和生产部署，通过本项目中的镜像既把区块链上链所需要的接入节点、mysql,redis,链端等合并在一起形成单一镜像，方便开发调试，也可以按需要把各个组件分散开来，形成微服务或服务网格中的镜像，进行大规模分布式的部署，获得世间双全法，实现不负如来不负卿。

## 使用介绍

docker镜像下载
```sh
docker run -d   --name spc-chain-base --env TESTNET="--testnet"  \
-p 8545:8545 -p 8200:8200  -p 8080:8080 -p 3306:3306  \
-p 6379:6379 sparkchain/spc-chain-base:1.0

```
 自己代码调用docker中的接口，其文档见[火花链接入文档]（https://github.com/dockerfile)，示例见[火花链留言板]（https://github.com/dockerfile）



| 分类 | 说明 |
| :------- | :----- |
| <a href="01ubuntu/README.md" target="_blank">Ubuntu操作系统镜像</a>| 干净的Ubuntu16.04操作系统，其它镜像的基础     |
| <a href="01python/README.md" target="_blank">Python的镜像</a>    | 在Ubuntu的基础上，安装Python环境   |
| <a href="03jdk8/README.md" target="_blank">Oracle JDK8镜像</a>    | 在Ubuntu的基础上，安装oracle的JDK 8|
| <a href="04jdk8_py/README.md" target="_blank">建立在Python基础上Oracle JDK8镜像</a>             | 在Ubuntu的和Python的基础上，安装oracle的JDK 8        |
| <a href="05nodejs/README.md" target="_blank">Nodejs镜像</a>   |    建立在Python基础上的Nodejs镜像         |
| <a href="06nodejs_jdk8/README.md" target="_blank">建立在JDK8基础上的Nodejs镜像</a>  | 既可以运行Nodejs和JDK8的镜像环境   |
| <a href="07mysql57/README.md" target="_blank">干净的mysql镜像</a>   | 建立在ubuntu上的mysql的镜像|
| <a href="08mysql57_jdk8/README.md" target="_blank">建立在JDK8基础上的Mysql镜像</a>                | 可以安装java应用并直接使用本地的mysql的数据库 |
| <a href="09mysql57_node10/README.md" target="_blank">建立在nodejs10基础上的Mysql镜像</a>                | 既可以运行nodejs应用同时还可以使用mysql数据库                  |
| <a href="09mysql57_node10_jdk8/README.md" target="_blank">建立在nodejs10和JKD8基础上的Mysql镜像</a>                | 既可以运行nodejs应用、Java应用，同时还可以使用mysql数据库          |
| <a href="10redis4/README.md" target="_blank">Redis4的单机镜像</a>          | 简化redis的单机版的安装   |
| <a href="11redis4_jdk8/README.md" target="_blank">建立在jdk8基础上的redis4</a> |可以安装使用Redis的java应用  |
| <a href="12redis4_mysql57_jdk8/README.md" target="_blank">redis4、mysql57、jdk8镜像</a> | 可以快速安装需要mysql和redis的java应用  |
| <a href="13redis4_mysql57_node10/README.md" target="_blank">redis4、mysql57、nodejs10的镜像</a> | 可以快速安装需要mysql和redis的nodejs应用  |
| <a href="14redis4_mysql57_node10_jdk8/README.md" target="_blank">redis4、mysql57、nodejs10、jdk8的镜像</a>                        | 一个镜像中既可以安装java应用、也可以安装nodejs应用 ｜
| <a href="15moac/README.md" target="_blank">moac的镜像</a>                 | moac目前不支持docker镜像，这里单独做了一个 |
| <a href="16moac_node10/README.md" target="_blank">moac和nodejs的镜像</a>                 | 可以方便地部署基于nodejs的moac链端应用          |
| <a href="17moac_redis4_mysql57_node10_jdk8/README.md" target="_blank">moac、jdk、nodejs、mysql、redis的镜像</a>                 | 把开发的java接入平台应用和链端应用部署一个docker中，方便开发调试         |

