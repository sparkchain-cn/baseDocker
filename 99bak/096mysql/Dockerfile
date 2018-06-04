#
# MySQL Dockerfile
#
# https://github.com/dockerfile/mysql
#

# Pull base image.
FROM sparkchain/ubuntu_python_jdk8_nodejs:1.0

RUN echo "deb http://cn.archive.ubuntu.com/ubuntu/ xenial main restricted universe multiverse" >> /etc/apt/sources.list

RUN echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections

RUN apt-get update && \
	apt-get -y install mysql-server-5.7 && \
	mkdir -p /var/lib/mysql && \
	mkdir -p /var/run/mysqld && \
	mkdir -p /var/log/mysql && \
	chown -R mysql:mysql /var/lib/mysql && \
	chown -R mysql:mysql /var/run/mysqld && \
	chown -R mysql:mysql /var/log/mysql


# UTF-8 and bind-address
RUN sed -i -e "$ a [client]\n\n[mysql]\n\n[mysqld]"  /etc/mysql/my.cnf && \
	sed -i -e "s/\(\[client\]\)/\1\ndefault-character-set = utf8/g" /etc/mysql/my.cnf && \
	sed -i -e "s/\(\[mysql\]\)/\1\ndefault-character-set = utf8/g" /etc/mysql/my.cnf && \
	sed -i -e "s/\(\[mysqld\]\)/\1\ninit_connect='SET NAMES utf8'\ncharacter-set-server = utf8\ncollation-server=utf8_unicode_ci\nbind-address = 0.0.0.0/g" /etc/mysql/my.cnf

#VOLUME /var/lib/mysql
VOLUME ["/etc/mysql", "/var/lib/mysql"]

#COPY ./startup.sh /root/mysqlStartup.sh
#RUN chmod +x /root/mysqlStartup.sh

COPY  ./startup.sh /usr/local/bin/mysqlStartup.sh
RUN chmod +x /usr/local/bin/mysqlStartup.sh
RUN sed -i 's/\r$//'  /usr/local/bin/mysqlStartup.sh

#ENTRYPOINT [ /usr/local/bin/mysqlStartup.sh]
EXPOSE 3306

CMD [ "/bin/bash", "/usr/local/bin/mysqlStartup.sh"]

#CMD ["mysqld"]
#CMD ["/usr/bin/mysqld_safe"]
#CMD ["/usr/bin/mysqld_safe"]
#docker build -t  sparkchain/ubuntu_python_jdk8_nodejs_mysql:1.0  D:\code\github\k8s-new\13dockerfile\06mysql\ -f Dockerfile

#docker rm -f mysql 
#docker run -d --name mysql -p 3307:3306    sparkchain/ubuntu_python_jdk8_nodejs_mysql:1.0 
