1. 安装pangu082完毕后，执行如下命令：
sudo ./moac --testnet --rpc --rpcapi="chain3,mc,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain="*"

2. 下载moac-end
git clone git@git.skyfromwell.com:foreso/moac-end.git

3. 在moac-end目录执行
npm install --save

4. 进入moac-end/bin，执行
node www.js
