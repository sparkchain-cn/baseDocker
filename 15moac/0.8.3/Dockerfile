
FROM sparkchain/ubuntu:16.04 

COPY pizzaAlpha.vnode.ubuntu.tar.gz  /

RUN \  
  mkdir -p /moac/ &&\
  tar xvzf /pizzaAlpha.vnode.ubuntu.tar.gz  -C /moac/   && \
  rm -f  /pizzaAlpha.vnode.ubuntu.tar.gz  && \
  ls /moac/vnode/ &&\
  cd  /moac/vnode/ && \
  printf '\n# export PATH="/moac/vnode/:$PATH"' >> /root/.bashrc

# Define working directory.
 WORKDIR /moac/vnode/
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
