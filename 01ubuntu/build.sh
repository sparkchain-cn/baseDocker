cd D:\code\github\k8s-new\13dockerfile\01ubuntu\

docker build -t  sparkchain/ubuntu:16.04   D:\code\github\k8s-new\13dockerfile\01ubuntu\  -f Dockerfile

docker stop  ubuntu
docker rm ubuntu

docker run -d --name ubuntu -p 3308:3306    sparkchain/ubuntu:16.04  
docker logs -f ubuntu
docker images
