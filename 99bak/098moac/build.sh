
docker build -t  sparkchain/ubuntu_moac  D:\code\github\k8s-new\13dockerfile\08moac\ -f Dockerfile

docker build -t  sparkchain/ubuntu_moac:0.8.2 D:\code\github\k8s-new\13dockerfile\08moac\ -f Dockerfile

docker tag sparkchain/ubuntu_moac  sparkchain/ubuntu_moac_nodejs_jdk8:1.0
docker rm ubuntu_moac


docker stop moac
docker rm moac
docker run -d --name moac -p 8545:8545 sparkchain/ubuntu_moac:0.8.2
docker logs -f  moac
