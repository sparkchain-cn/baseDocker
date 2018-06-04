cd  D:\code\github\k8s-new\13dockerfile\09mysql57_node10_jdk8\
docker build -t  sparkchain/mysql_node10_jdk8:5.7  D:\code\github\k8s-new\13dockerfile\09mysql57_node10_jdk8\ -f Dockerfile

docker stop mysql_node10_jdk8
docker rm -f mysql_node10_jdk8 
docker run -d --name mysql_node10_jdk8 -p 3307:3306   sparkchain/mysql_node10_jdk8:5.7 
docker logs -f mysql_node10_jdk8

#docker run -d --name mysql -p 3307:3306  -v /etc/mysql:/etc/mysql -v /var/lib/mysql:/var/lib/mysql   sparkchain/mysql_node10_jdk8:5.7
#VOLUME ["/etc/mysql", "/var/lib/mysql"]
