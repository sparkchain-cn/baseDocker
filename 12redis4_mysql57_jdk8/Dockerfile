#
# Redis Dockerfile
#
# https://github.com/dockerfile/redis
#

# Pull base image.
FROM sparkchain/mysql_jdk8:5.7

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
VOLUME ["/data","/etc/redis"]

# Define working directory.
WORKDIR /data

RUN mkdir -p /usr/local/bin/redis/ 
COPY  ./startup.sh /usr/local/bin/redis/startup.sh
RUN chmod +x /usr/local/bin/redis/startup.sh
RUN sed -i 's/\r$//' /usr/local/bin/redis/startup.sh


EXPOSE 6379

ENTRYPOINT ["/usr/local/bin/redis/startup.sh"]

CMD ["redis-server", "/etc/redis/redis.conf"]

# Define default command.
#CMD ["redis-server", "/etc/redis/redis.conf"]
#CMD ["redis-server", "/etc/redis/redis.conf"]
#CMD ["/bin/bash", "/usr/local/bin/redis/startup.sh"]
# Expose ports.

