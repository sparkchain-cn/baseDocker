
cd  D:\code\github\k8s-new\13dockerfile\04jdk8_py\
docker build -t  sparkchain/jdk_py:1.8   D:\code\github\k8s-new\13dockerfile\04jdk8_py\  -f Dockerfile

docker stop  jdk_py
docker rm jdk_py

docker run -d --name jdk_py sparkchain/jdk_py:1.8 
docker logs -f jdk_py

docker images
