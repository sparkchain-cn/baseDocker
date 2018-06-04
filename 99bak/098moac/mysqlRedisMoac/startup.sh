#! /bin/bash
set -e

cd /usr/local/bin/
 ./mysqlRedisNodejsStartup.sh &

 sleep 5

 exec "$@"

