

docker build -t  sparkchain/moac:0.8.4 . -f Dockerfile

docker stop moac
docker rm moac
#docker run -d --name moac -p 8545:8545  --env testnet="--testnet"  sparkchain/moac:0.8.2
docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"  sparkchain/moac:0.8.4
docker logs -f  moac


docker run -d --name moac -p 8545:8545  --env TESTNET="--testnet"  -v /root/:/root/ sparkchain/moac:0.8.4
docker run -d --name moac -p 8545:8545  sparkchain/moac:0.8.4
