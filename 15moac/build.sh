

docker build -t  sparkchain/moac:0.8.3 . -f Dockerfile
docker push  sparkchain/moac:0.8.3 

rm -rf  /data/moac_test/
rm -rf  /data/moac_pro/
mkdir -p /data/moac_test/
mkdir -p /data/moac_pro/
docker stop moac_test
docker rm moac_test
#docker run -d --name moac -p 8545:8545  --env testnet="--testnet"  sparkchain/moac:0.8.2
docker run -d --name moac_test  -p 8545:8545  -p 30333:30333   -v /data/moac_test/:/root/  --env TESTNET="--testnet"  sparkchain/moac:0.8.3
docker logs -f  moac_test

docker stop moac_pro
docker rm moac_pro
docker run -d --name moac_pro -p 8546:8545  -p 30334:30333    -v /data/moac_pro/:/root/   sparkchain/moac:0.8.3
docker logs -f  moac_pro

