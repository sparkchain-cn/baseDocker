cd  D:\code\github\k8s-new\13dockerfile\11redis4_jdk8\
docker build -t  sparkchain/redis_jdk8:4 D:\code\github\k8s-new\13dockerfile\11redis4_jdk8\ -f Dockerfile

docker stop redis_jdk8
docker rm -f redis_jdk8 
docker run -d --name redis_jdk8 -p 6380:6379  sparkchain/redis_jdk8:4 
docker logs -f redis_jdk8
