
cd  D:\code\github\k8s-new\13dockerfile\13redis4_mysql57_node10\
docker build -t  sparkchain/redis4_mysql57_node10:4  D:\code\github\k8s-new\13dockerfile\13redis4_mysql57_node10\ -f Dockerfile

docker stop redis4_mysql57_node10
docker rm -f redis4_mysql57_node10 
docker run -d --name redis4_mysql57_node10 -p 3307:3306  -p 6380:6379  sparkchain/redis4_mysql57_node10:4 
docker logs -f redis4_mysql57_node10


