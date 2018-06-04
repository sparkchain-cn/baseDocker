cd D:\code\github\k8s-new\13dockerfile\17moac_redis4_mysql57_node10_jdk8
docker build -t  sparkchain/moac_node_java_mysql_redis:0.8.2 D:\code\github\k8s-new\13dockerfile\17moac_redis4_mysql57_node10_jdk8 -f Dockerfile

docker stop moac_node_java_mysql_redis
docker rm moac_node_java_mysql_redis
#docker run -d --name moac -p 8545:8545  --env testnet="--testnet"  sparkchain/moac:0.8.2
docker run -d --name moac_node_java_mysql_redis -p 8545:8545 -p 3307:3306 -p 6380:6379 --env TESTNET="--testnet"  sparkchain/moac_node_java_mysql_redis:0.8.2
docker logs -f  moac_node_java_mysql_redis

docker run -d --name moac_node_java_mysql_redis -p 8545:8545 -p 3307:3306 -p 6380:6379   --env TESTNET="--testnet"  -v /root/:/root/ sparkchain/moac_node_java_mysql_redis:0.8.2
docker run -d --name moac_node_java_mysql_redis -p 8545:8545 -p 3307:3306 -p 6380:6379   sparkchain/moac_node_java_mysql_redis:0.8.2
