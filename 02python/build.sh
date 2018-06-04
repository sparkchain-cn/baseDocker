
cd D:\code\github\k8s-new\13dockerfile\02python\

docker build -t  sparkchain/python:2.7   D:\code\github\k8s-new\13dockerfile\02python\  -f Dockerfile

docker stop  python
docker rm python

docker run -d --name python  sparkchain/python:2.7 
docker logs -f python
docker images

