
docker build -t  sparkchain/ether:1.8.2 . -f Dockerfile
docker push  sparkchain/ether:1.8.2

rm -rf  /data/eth_test/
rm -rf  /data/eth_pro/
mkdir -p /data/eth_test/
mkdir -p /data/eth_pro/
docker rm -f eth_test
docker run -it --name eth_test  -p 8575:8545   -p 8576:8546 -p 30373:30333   \
 -v /data/moac_test/:/data/  sparkchain/ether:1.8.2  \
 --testnet --networkid 3 --syncmode "full" --datadir "/data/work/.ethereum"  --rpc --rpcaddr 0.0.0.0 --rpcapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain "*"   --ws --wsaddr 0.0.0.0 --wsorigins "*"  --wsapi "web3,eth,net,personal,admin,debug,miner,txpool,db"  

docker logs -f  eth_test


docker pull ethereum/client-go
docker tag ethereum/client-go  10.31.0.45:5000/ethereum/client-go 
docker push 10.31.0.45:5000/ethereum/client-go

docker run -d --name eth-test -v /Users/alice/ethereum:/root \
         -p 8745:8545 -p 30373:30303 \
         ethereum/client-go   --testnet --networkid 3 --syncmode "full"   \
         --rpc --rpcaddr 0.0.0.0 --rpcapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain "*"   \
          --ws --wsaddr 0.0.0.0 --wsorigins "*"  --wsapi "web3,eth,net,personal,admin,debug,miner,txpool,db"


docker run -d --name eth-test -v /Users/alice/ethereum:/root \
         -p 8746:8545 -p 30374:30303 \
         ethereum/client-go    --syncmode "full"   \
         --rpc --rpcaddr 0.0.0.0 --rpcapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain "*"   \
          --ws --wsaddr 0.0.0.0 --wsorigins "*"  --wsapi "web3,eth,net,personal,admin,debug,miner,txpool,db"
