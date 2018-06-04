#
# Redis Dockerfile
#
# https://github.com/dockerfile/redis
#

# Pull base image.
FROM sparkchain/ubuntu_python_jdk8_mysql:1.0

# Install Redis.
RUN \
  cd /tmp && \
  wget http://download.redis.io/redis-stable.tar.gz && \
  tar xvzf redis-stable.tar.gz && \
  cd redis-stable && \
  make && \
  make install && \
  cp -f src/redis-sentinel /usr/local/bin && \
  mkdir -p /etc/redis && \
  cp -f *.conf /etc/redis && \
  rm -rf /tmp/redis-stable* && \
  sed -i 's/^\(bind .*\)$/# \1/' /etc/redis/redis.conf && \
  sed -i 's/^\(daemonize .*\)$/# \1/' /etc/redis/redis.conf && \
  sed -i 's/^\(dir .*\)$/# \1\ndir \/data/' /etc/redis/redis.conf && \
  sed -i 's/^\(logfile .*\)$/# \1/' /etc/redis/redis.conf &&\
  sed -i "s/protected-mode yes/protected-mode no/g" /etc/redis/redis.conf
# Define mountable directories.
VOLUME ["/data"]

# Define working directory.
WORKDIR /data

COPY  ./startup.sh /usr/local/bin/mysqlRedisStartup.sh
RUN chmod +x /usr/local/bin/mysqlRedisStartup.sh
RUN sed -i 's/\r$//'  /usr/local/bin/mysqlRedisStartup.sh


# Define default command.
#CMD ["redis-server", "/etc/redis/redis.conf"]
#CMD ["redis-server", "/etc/redis/redis.conf"]
CMD ["/bin/bash", "/usr/local/bin/mysqlRedisStartup.sh"]
# Expose ports.
EXPOSE 6379
