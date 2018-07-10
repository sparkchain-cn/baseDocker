cd D:\code\github\k8s-new\13dockerfile\16moac_node10
docker build -t  sparkchain/moac_node10:0.8.2 D:\code\github\k8s-new\13dockerfile\16moac_node10\ -f Dockerfile

docker stop moac_node10
docker rm moac_node10
#docker run -d --name moac -p 8545:8545  --env testnet="--testnet"  sparkchain/moac:0.8.2
docker run -d --name moac_node10 -p 8545:8545  --env TESTNET="--testnet"  sparkchain/moac_node10:0.8.2
docker logs -f  moac_node10


docker run -d --name moac_node10 -p 8545:8545  --env TESTNET="--testnet"  -v /root/:/root/ sparkchain/moac_node10:0.8.2
docker run -d --name moac_node10 -p 8545:8545  sparkchain/moac_node10:0.8.2
