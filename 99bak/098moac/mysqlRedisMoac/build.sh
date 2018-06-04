
docker build -t  sparkchain/ubuntu_python_jdk8_nodejs_mysql_redis_moac:1.0 D:\code\github\k8s-new\13dockerfile\08moac\mysqlRedisMoac\ -f Dockerfile


docker stop moac
docker rm moac
docker run -d --name moac -p 8546:8545 -p 3307:3306 -p 6380:6379  sparkchain/ubuntu_python_jdk8_nodejs_mysql_redis_moac:1.0
docker logs -f  moac
