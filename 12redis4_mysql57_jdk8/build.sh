
cd  D:\code\github\k8s-new\13dockerfile\12redis4_mysql57_jdk8\
docker build -t  sparkchain/redis_mysql57_jdk8:4  D:\code\github\k8s-new\13dockerfile\12redis4_mysql57_jdk8\ -f Dockerfile

docker stop redis_mysql57_jdk8
docker rm -f redis_mysql57_jdk8 
docker run -d --name redis_mysql57_jdk8 -p 3307:3306  -p 6380:6379  sparkchain/redis_mysql57_jdk8:4 
docker logs -f redis_mysql57_jdk8



docker tag sparkchain/redis_mysql57_jdk8:4   sparkchain/redis_mysql57_jdk8:4 