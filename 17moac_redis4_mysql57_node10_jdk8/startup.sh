#! /bin/bash
set -e

exec  "/usr/local/bin/redis/startup.sh"   &

redis-server  "/etc/redis/redis.conf"  &

#cd /usr/local/bin/
# ./startup.sh &


#--testnet
cd /moac/pangu0.8.4/vnode/
/moac/pangu0.8.4/vnode/moac  ${TESTNET} --rpc  --rpcaddr="0.0.0.0"  --rpcapi="chain3,mc,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain="*"

#/moac/pangu-release0.8.2/moac "--testnet", "--rpc", "--rpcaddr=0.0.0.0", "--rpcapi=chain3,mc,net,personal,admin,debug,miner,txpool,db", "--rpccorsdomain=*" 


#exec "/moac/pangu-release0.8.2/moac" "--testnet", "--rpc", "--rpcaddr=0.0.0.0", "--rpcapi=chain3,mc,net,personal,admin,debug,miner,txpool,db", "--rpccorsdomain=*" 

#CMD ["./moac", "--testnet", "--rpc", "--rpcaddr=0.0.0.0", "--rpcapi=chain3,mc,net,personal,admin,debug,miner,txpool,db", "--rpccorsdomain=*"]

#/usr/bin/mysqld_safe
sleep 5
 
exec "$@"