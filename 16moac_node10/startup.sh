#! /bin/bash
set -e

cd /moac/pangu0.8.4/vnode/

#--testnet
/moac/pangu0.8.4/vnode/moac  ${TESTNET} --rpc  "--rpcaddr=0.0.0.0"  --rpcapi="chain3,mc,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain="*"

#/moac/pangu-release0.8.2/moac "--testnet", "--rpc", "--rpcaddr=0.0.0.0", "--rpcapi=chain3,mc,net,personal,admin,debug,miner,txpool,db", "--rpccorsdomain=*" 


#exec "/moac/pangu-release0.8.2/moac" "--testnet", "--rpc", "--rpcaddr=0.0.0.0", "--rpcapi=chain3,mc,net,personal,admin,debug,miner,txpool,db", "--rpccorsdomain=*" 

#CMD ["./moac", "--testnet", "--rpc", "--rpcaddr=0.0.0.0", "--rpcapi=chain3,mc,net,personal,admin,debug,miner,txpool,db", "--rpccorsdomain=*"]

#/usr/bin/mysqld_safe
sleep 5
 
exec "$@"