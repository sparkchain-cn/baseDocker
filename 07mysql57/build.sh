cd  D:\code\github\k8s-new\13dockerfile\07mysql57\
docker build -t  sparkchain/mysql:5.7  D:\code\github\k8s-new\13dockerfile\07mysql57\ -f Dockerfile

docker stop mysql
docker rm -f mysql 
docker run -d --name mysql -p 3307:3306    sparkchain/mysql:5.7
docker logs -f mysql

#docker run -d --name mysql -p 3307:3306  -v /etc/mysql:/etc/mysql -v /var/lib/mysql:/var/lib/mysql   sparkchain/ubuntu_python_jdk8_nodejs_mysql:1.0 

#VOLUME ["/etc/mysql", "/var/lib/mysql"]


# docker build -t  sparkchain/ubuntu_python_jdk8_mysql:1.0  D:\code\github\k8s-new\13dockerfile\06mysql\ -f javaMysql.Dockerfile


# docker stop mysql1
# docker rm -f mysql 1
# docker run -d --name mysql1 -p 3308:3306    sparkchain/ubuntu_python_jdk8_mysql:1.0  
# docker logs -f mysql1