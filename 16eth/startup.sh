#! /bin/bash
set -e

#cd /usr/local/bin/
# ./startup.sh &
cd /eth/

#--testnet
/moac/vnode/moac  ${TESTNET} --rpc  "--rpcaddr=0.0.0.0"  --rpcapi="chain3,mc,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain="*"


geth   ${TESTNET}  --syncmode "full" --datadir "/data/work/.eth_mainnet" \
--rpc --rpcaddr 0.0.0.0 --rpcport 7545 \
--rpcapi "web3,eth,net,personal,admin,debug,miner,txpool,db" \
--ws --wsaddr 0.0.0.0 --wsport 7546 --wsorigins "*"  \
wsapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain "*"

# --testnet --networkid 3

sleep 5
 
exec "$@"


# sudo ./geth --testnet --networkid 3 --syncmode "full" --datadir "/data/work/.ethereum" --rpc --rpcaddr 0.0.0.0 --
# rpcport 7545 --rpcapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --ws --wsaddr 0.0.0.0 --wsport 7546 --
# wsorigins "*" wsapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain "*"