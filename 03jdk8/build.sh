
cd D:\code\github\k8s-new\13dockerfile\03jdk8\
docker build -t  sparkchain/jdk:1.8   D:\code\github\k8s-new\13dockerfile\03jdk8  -f Dockerfile

docker stop  jdk
docker rm jdk

docker run -d --name jdk sparkchain/jdk:1.8 
docker logs -f jdk
docker images
