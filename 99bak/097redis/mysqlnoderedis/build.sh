docker build -t  sparkchain/ubuntu_python_jdk8_nodejs_mysql_redis:1.0  D:\code\github\k8s-new\13dockerfile\07redis\mysqlnoderedis\ -f Dockerfile

docker stop redis
docker rm -f redis 
docker run -d --name redis -p 3307:3306  -p 6380:6379  sparkchain/ubuntu_python_jdk8_nodejs_mysql_redis:1.0 
docker logs -f redis


