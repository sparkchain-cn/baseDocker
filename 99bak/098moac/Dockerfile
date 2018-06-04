#
# Node.js Dockerfile
#
# https://github.com/dockerfile/nodejs
#

# Pull base image.
#FROM sparkchain/ubuntu_jdk8_nodejs

FROM sparkchain/ubuntu:16.04 

COPY pangu-release0.8.2.tar.gz  /

RUN \  
  mkdir -p /moac/ &&\
  tar xvzf /pangu-release0.8.2.tar.gz  -C /moac/   && \
  rm -f  /pangu-release0.8.2.tar.gz  && \
  ls /moac/pangu-release0.8.2/ &&\
  cd  /moac/pangu-release0.8.2/ && \
  printf '\n# moac\nexport PATH="/moac/pangu-release0.8.2/:$PATH"' >> /root/.bashrc

 EXPOSE  8545
# Define working directory.
WORKDIR /moac/pangu-release0.8.2/

# Define default command.
#CMD ["./moac --testnet --rpc --rpcapi=\"chain3,mc,net,personal,admin,debug,miner,txpool,db\" --rpccorsdomain=\"*\""]

CMD ["./moac", "--testnet", "--rpc", "--rpcaddr=0.0.0.0", "--rpcapi=chain3,mc,net,personal,admin,debug,miner,txpool,db", "--rpccorsdomain=*"]

#docker run -i -t sparkchain/ubuntu_moac /bin/bash

#docker run -d sparkchain/ubuntu_moac /bin/bash

#docker rm ubuntu_moac
#docker run -d --name ubuntu_moac sparkchain/ubuntu_moac 

#docker run -d --name ubuntu_moac1 -p 8545:8545 sparkchain/ubuntu_moac  ./moac --testnet --rpc --rpcaddr=0.0.0.0 --rpcapi="chain3,mc,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain="*"
#moac --testnet --rpc --rpcaddr=0.0.0.0 --rpcapi="chain3,mc,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain="*"

#docker rm ubuntu_moac2
#docker run -d --name ubuntu_moac2 -p 8545:8545 sparkchain/ubuntu_moac:0.8.2  ./moac --testnet --rpc --rpcaddr=0.0.0.0 --rpcapi="chain3,mc,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain="*"
#docker run -d --name ubuntu_moac ssparkchain/ubuntu_moac_nodejs_jdk8:1.0  