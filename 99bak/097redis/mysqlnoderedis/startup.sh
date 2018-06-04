#! /bin/bash
set -e

cd /usr/local/bin/
 ./mysqlStartup.sh &

 sleep 5
 
redis-server  /etc/redis/redis.conf
