cd D:\code\github\k8s-new\13dockerfile\15moac
docker build -t  sparkchain/moac:0.8.2 D:\code\github\k8s-new\13dockerfile\15moac\ -f Dockerfile

docker stop moac
docker rm moac
#docker run -d --name moac -p 8545:8545  --env testnet="--testnet"  sparkchain/moac:0.8.2
docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"  sparkchain/moac:0.8.2
docker logs -f  moac


docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"  -v /root/:/root/ sparkchain/moac:0.8.2
docker run -d --name moac -p 8545:8545  sparkchain/moac:0.8.2
