
FROM  sparkchain/redis4_mysql57_node10_jdk8:4 


COPY pangu0.8.4.ubuntu.tar.gz  /

RUN \  
  mkdir -p /moac/ &&\
  tar xvzf /pangu0.8.4.ubuntu.tar.gz  -C /moac/   && \
  rm -f  /pangu0.8.4.ubuntu.tar.gz  && \
  ls /moac/pangu0.8.4/vnode/ &&\
  cd  /moac/pangu0.8.4/vnode/ && \
  printf '\n# export PATH="/moac/pangu0.8.4/vnode/:$PATH"' >> /root/.bashrc

# Define working directory.
 WORKDIR /moac/pangu0.8.4/vnode/
 VOLUME [ "/root" ]
 EXPOSE  8545


RUN mkdir -p /usr/local/bin/moac/ 
COPY  ./startup.sh /usr/local/bin/moac/startup.sh
RUN chmod +x /usr/local/bin/moac/startup.sh
RUN sed -i 's/\r$//' /usr/local/bin/moac/startup.sh

ENTRYPOINT ["/usr/local/bin/moac/startup.sh"]


# Define default command.
#CMD ["./moac --testnet --rpc --rpcapi=\"chain3,mc,net,personal,admin,debug,miner,txpool,db\" --rpccorsdomain=\"*\""]

#CMD ["./moac", "--testnet", "--rpc", "--rpcaddr=0.0.0.0", "--rpcapi=chain3,mc,net,personal,admin,debug,miner,txpool,db", "--rpccorsdomain=*"]
