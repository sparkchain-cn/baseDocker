
cd D:\code\github\k8s-new\13dockerfile\05nodejs\
docker build -t  sparkchain/nodejs:10.1   D:\code\github\k8s-new\13dockerfile\05nodejs\  -f Dockerfile

docker stop  nodejs
docker rm nodejs

docker run -d --name nodejs sparkchain/nodejs:10.1 
docker logs -f nodejs

docker images
