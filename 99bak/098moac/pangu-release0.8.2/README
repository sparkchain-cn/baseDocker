MOAC Pangu-release 0.8.2 
for both mainnet and testnet

--Debian/Ubuntu/CentOS--
1. Untar the file using tar, under the directory, run
./moac

To see the help, use
./moac --help

To enable the console, can use:
./moac console

A mainnet directory will be created under $HOME/.moac/
and some info should be seen as:

    INFO [04-24|11:24:26.506] 86161:IPC endpoint closed: /home/user/.moac/moac.ipc 

from another terminal, run moac again to attach the running node
./moac attach $HOME/.moac/moac.ipc


2. from console prompt, create coinbase account
>personal.newAccount()

3. from console prompt, start mining by running
>miner.start()

4. from another terminal, run moac again to attach the running node
./moac attach

5. from prompt, load script
>loadScript("mctest.js")

6. check if miner has mined any moac by checking:
>mc.accounts

7. create another account
>personal.newAccount()


8. try send from one account to another:
>Send(mc.accounts[0], '', mc.accounts[1], 0.1)



--Test file--
This testpackage contains a js file for testing purpose.
To use, under the console:
>loadScript("mctest.js")

FutureSend is a good example to test the System Contract
performance. It will send a mc transaction using the 
System Contract at a certain block. If the input block
number is smaller than current block number, the transaction
will fail.



