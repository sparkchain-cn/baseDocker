
FROM sparkchain/ubuntu:16.04 

COPY geth  /
RUN  ls /bin/
VOLUME [ "/data" ]
#ENTRYPOINT ["/bin/geth"]
ENTRYPOINT /geth
#CMD [ "/bin/geth" ]

# --testnet --networkid 3 --syncmode "full" --datadir "/data/work/.ethereum" --rpc --rpcaddr 0.0.0.0 -- rpcport 7545 --rpcapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --ws --wsaddr 0.0.0.0 --wsport 7546 --wsorigins "*" wsapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain "*"


# Define default command.
#CMD ["./moac --testnet --rpc --rpcapi=\"chain3,mc,net,personal,admin,debug,miner,txpool,db\" --rpccorsdomain=\"*\""]

#CMD ["./moac", "--testnet", "--rpc", "--rpcaddr=0.0.0.0", "--rpcapi=chain3,mc,net,personal,admin,debug,miner,txpool,db", "--rpccorsdomain=*"]


# sudo ./geth --testnet --networkid 3 --syncmode "full" --datadir "/data/work/.ethereum" --rpc --rpcaddr 0.0.0.0 --
# rpcport 7545 --rpcapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --ws --wsaddr 0.0.0.0 --wsport 7546 --
# wsorigins "*" wsapi "web3,eth,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain "*"