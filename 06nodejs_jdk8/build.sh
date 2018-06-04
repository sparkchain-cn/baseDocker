
cd  D:\code\github\k8s-new\13dockerfile\06nodejs_jdk8\
docker build -t  sparkchain/nodejs_jdk8:10.1   D:\code\github\k8s-new\13dockerfile\06nodejs_jdk8\  -f Dockerfile

docker stop  nodejs_jdk8
docker rm nodejs_jdk8

docker run -d --name nodejs_jdk8 sparkchain/nodejs_jdk8:10.1 
docker logs -f nodejs_jdk8

docker images
