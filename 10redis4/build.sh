cd  D:\code\github\k8s-new\13dockerfile\10redis4\
docker build -t  sparkchain/redis:4  D:\code\github\k8s-new\13dockerfile\10redis4\ -f Dockerfile

docker stop redis
docker rm -f redis 
docker run -d --name redis -p 6380:6379  sparkchain/redis:4 
docker logs -f redis
