#! /bin/bash
set -e

#cd /usr/local/bin/
# ./startup.sh &

exec "/usr/local/mysql57/startup.sh" "/usr/bin/mysqld_safe" &

#/usr/bin/mysqld_safe
sleep 5
 
exec "$@"
#redis-server  /etc/redis/redis.conf
