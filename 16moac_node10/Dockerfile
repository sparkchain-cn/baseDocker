
FROM  sparkchain/nodejs:10.1 

COPY pangu-release0.8.2.tar.gz  /

RUN \  
  mkdir -p /moac/ &&\
  tar xvzf /pangu-release0.8.2.tar.gz  -C /moac/   && \
  rm -f  /pangu-release0.8.2.tar.gz  && \
  ls /moac/pangu-release0.8.2/ &&\
  cd  /moac/pangu-release0.8.2/ && \
  printf '\n# moac\nexport PATH="/moac/pangu-release0.8.2/:$PATH"' >> /root/.bashrc

# Define working directory.
 WORKDIR /moac/pangu-release0.8.2/
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
